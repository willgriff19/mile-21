import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, distinctId } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const notionKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;
    const posthogProjectId = process.env.POSTHOG_PROJECT_ID;

    if (!notionKey || !databaseId) {
      console.error('Missing Notion configuration');
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    // Build properties object
    const properties: any = {
      Email: {
        title: [
          {
            text: {
              content: email,
            },
          },
        ],
      },
      'Date Added': {
        date: {
          start: new Date().toISOString(),
        },
      },
    };

    // Add PostHog Link if distinctId is provided
    if (distinctId && posthogProjectId) {
      properties['PostHog Link'] = {
        url: `https://us.posthog.com/project/${posthogProjectId}/person/${distinctId}`,
      };
    }

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
      return NextResponse.json({ error: 'Failed to save to Notion' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

