import { NextResponse } from 'next/server';

type NotionDatabase = {
  properties: Record<string, { type: string }>;
};

function getTitlePropertyName(db: NotionDatabase): string | null {
  for (const [name, prop] of Object.entries(db.properties || {})) {
    if (prop?.type === "title") return name;
  }
  return null;
}

function pickPropertyNameByType(
  db: NotionDatabase,
  type: string,
  opts?: { preferredNames?: string[]; nameRegex?: RegExp }
): string | null {
  const props = db.properties || {};
  const preferredNames = opts?.preferredNames ?? [];

  // 1) Exact preferred name match
  for (const name of preferredNames) {
    if (props[name]?.type === type) return name;
  }

  // 2) Case-insensitive preferred name match
  for (const name of preferredNames) {
    const match = Object.keys(props).find((k) => k.toLowerCase() === name.toLowerCase());
    if (match && props[match]?.type === type) return match;
  }

  const candidates = Object.entries(props)
    .filter(([, p]) => p?.type === type)
    .map(([name]) => name);

  // 3) If there's only one property of that type, use it.
  if (candidates.length === 1) return candidates[0];

  // 4) If a regex is provided, try narrowing.
  if (opts?.nameRegex) {
    const narrowed = candidates.filter((name) => opts.nameRegex!.test(name));
    if (narrowed.length === 1) return narrowed[0];
  }

  return null;
}

function buildNotionProperties(db: NotionDatabase, input: { email: string; distinctId?: string; cta?: string; posthogProjectId?: string }) {
  const { email, distinctId, cta, posthogProjectId } = input;
  const props: Record<string, any> = {};

  const titleName = getTitlePropertyName(db);
  if (titleName) {
    props[titleName] = {
      title: [{ text: { content: email } }],
    };
  }

  // Common optional fields (only set if the property exists in the database schema)
  const dbProps = db.properties || {};

  if (dbProps["Email"]?.type === "email") {
    props["Email"] = { email };
  }

  const datePropName = pickPropertyNameByType(db, "date", {
    preferredNames: ["Date Added", "Date", "Signup Date", "Added", "Created"],
    nameRegex: /date|added|signup|created/i,
  });
  if (datePropName) {
    props[datePropName] = { date: { start: new Date().toISOString() } };
  }

  if (cta && dbProps["CTA"]?.type === "select") {
    props["CTA"] = { select: { name: cta } };
  }

  const posthogUrlPropName = pickPropertyNameByType(db, "url", {
    preferredNames: ["PostHog Link", "Posthog Link", "PostHog", "Posthog", "PostHog URL", "Posthog URL"],
    nameRegex: /posthog/i,
  });
  if (distinctId && posthogProjectId && posthogUrlPropName) {
    props[posthogUrlPropName] = {
      url: `https://us.posthog.com/project/${posthogProjectId}/person/${distinctId}`,
    };
  }

  return props;
}

export async function POST(request: Request) {
  try {
    const { email, distinctId, cta } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const notionKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;
    const posthogProjectId = process.env.POSTHOG_PROJECT_ID;

    if (!notionKey || !databaseId) {
      console.error('Missing Notion configuration');
      return NextResponse.json(
        {
          error:
            "Server is missing Notion configuration. Set NOTION_API_KEY and NOTION_DATABASE_ID in your environment.",
        },
        { status: 500 }
      );
    }

    // Fetch database schema so we can set the correct Title property name and avoid type mismatches.
    const dbRes = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${notionKey}`,
        "Notion-Version": "2022-06-28",
      },
    });

    if (!dbRes.ok) {
      const errorData = await dbRes.json().catch(() => null);
      console.error("Notion database fetch error:", errorData);
      return NextResponse.json(
        {
          error: "Failed to read Notion database schema. Check database ID + integration access.",
          ...(process.env.NODE_ENV !== "production" ? { notion: errorData } : {}),
        },
        { status: 500 }
      );
    }

    const db: NotionDatabase = await dbRes.json();
    const titleName = getTitlePropertyName(db);
    if (!titleName) {
      return NextResponse.json(
        {
          error:
            "Notion database is missing a Title property (required). Please ensure the database has a title field.",
        },
        { status: 500 }
      );
    }

    const properties = buildNotionProperties(db, { email, distinctId, cta, posthogProjectId });

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notion API error:', errorData);
      return NextResponse.json(
        {
          error: "Failed to save to Notion",
          ...(process.env.NODE_ENV !== "production" ? { notion: errorData } : {}),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        ...(process.env.NODE_ENV !== "production"
          ? { details: error instanceof Error ? error.message : String(error) }
          : {}),
      },
      { status: 500 }
    );
  }
}

