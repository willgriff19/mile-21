#!/usr/bin/env node
/**
 * Generate images (and optionally videos) via Google Gemini APIs.
 *
 * IMPORTANT:
 * - Put your key in an env var. Do NOT hardcode it.
 * - By default this script uses the "Gemini API key" (Google AI Studio) for IMAGE generation.
 * - Video generation is typically NOT available via API key; it usually requires Vertex AI + a service account.
 *
 * Usage:
 *   GEMINI_API_KEY="..." node scripts/generate-media.mjs image \
 *     --prompt prompts/media/hero-poster.txt \
 *     --out public/generated/hero.png
 *
 *   GEMINI_API_KEY="..." node scripts/generate-media.mjs batch \
 *     --dir prompts/media \
 *     --outDir public/generated
 */

import fs from "node:fs";
import path from "node:path";

const API_KEY = process.env.GEMINI_API_KEY;

// Model names can change; keep them configurable.
// For Nano Banana / Gemini Flash Image, model IDs can evolve. We default to `auto`,
// which tries to discover the newest image-capable model via the models list endpoint.
// You can pin a specific model by setting GEMINI_IMAGE_MODEL, e.g.:
//   GEMINI_IMAGE_MODEL="gemini-2.5-flash-image"
const DEFAULT_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "auto";

// Fallback if discovery fails.
const FALLBACK_IMAGE_MODEL = "gemini-2.5-flash-image";

// Prompt enhancement (text) model. This runs BEFORE image generation when --enhance is used.
// You can pin it if desired, e.g. GEMINI_TEXT_MODEL="gemini-2.5-pro"
const DEFAULT_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || "auto";

function die(msg) {
  console.error(msg);
  process.exit(1);
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2);
      const v = argv[i + 1];
      if (!v || v.startsWith("--")) out[k] = true;
      else {
        out[k] = v;
        i++;
      }
    } else {
      out._.push(a);
    }
  }
  return out;
}

function parseCommaList(val) {
  if (!val) return [];
  return String(val)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readTextFile(p) {
  return fs.readFileSync(p, "utf8").trim();
}

function readBinaryBase64(p) {
  return fs.readFileSync(p).toString("base64");
}

function extToMime(p) {
  const lower = p.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  // Default: let the API try.
  return "application/octet-stream";
}

async function fetchJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response (status ${res.status}): ${text.slice(0, 400)}`);
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(json).slice(0, 1200)}`);
  }

  return json;
}

async function fetchJsonGet(url) {
  const res = await fetch(url, { method: "GET" });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response (status ${res.status}): ${text.slice(0, 400)}`);
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(json).slice(0, 1200)}`);
  }
  return json;
}

function compareModelVersions(a, b) {
  // Heuristic: pick the highest numeric version embedded in the model id.
  // Examples: gemini-2.5-flash-image > gemini-2.0-flash-image
  const extract = (s) => {
    const m = s.match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
    if (!m) return [0, 0, 0];
    return [Number(m[1] || 0), Number(m[2] || 0), Number(m[3] || 0)];
  };
  const av = extract(a);
  const bv = extract(b);
  for (let i = 0; i < 3; i++) {
    if (av[i] !== bv[i]) return av[i] - bv[i];
  }
  // If versions tie, prefer longer/more specific name (often newer variants).
  return a.length - b.length;
}

async function pickLatestImageModel() {
  if (!API_KEY) die("Missing GEMINI_API_KEY env var.");
  const base = "https://generativelanguage.googleapis.com/v1beta";
  const url = `${base}/models?key=${encodeURIComponent(API_KEY)}`;

  try {
    const json = await fetchJsonGet(url);
    const models = json?.models ?? [];

    const imageCandidates = models
      .filter((m) => {
        const name = (m?.name || "").toLowerCase();
        const methods = m?.supportedGenerationMethods || [];
        // We can only call generateContent in this script.
        // Many Imagen models show up in the list but require generateImages instead.
        return (
          name.includes("image") &&
          methods.includes("generateContent") &&
          // Prefer Gemini image-capable models (Nano Banana / Flash Image), avoid Imagen family.
          !name.includes("imagen")
        );
      })
      .map((m) => String(m.name || "").replace(/^models\//, ""));

    if (!imageCandidates.length) return FALLBACK_IMAGE_MODEL;

    imageCandidates.sort((a, b) => compareModelVersions(a, b));
    return imageCandidates[imageCandidates.length - 1] || FALLBACK_IMAGE_MODEL;
  } catch {
    return FALLBACK_IMAGE_MODEL;
  }
}

function extractTextFromGenerateContent(json) {
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const texts = [];
  for (const p of parts) {
    if (typeof p?.text === "string") texts.push(p.text);
  }
  return texts.join("\n").trim();
}

async function generateText({ prompt, model = DEFAULT_TEXT_MODEL }) {
  if (!API_KEY) die("Missing GEMINI_API_KEY env var.");
  const base = "https://generativelanguage.googleapis.com/v1beta";
  const resolvedModel =
    model === "auto" || model === "latest" ? "gemini-2.0-flash" : model;
  const url = `${base}/models/${encodeURIComponent(resolvedModel)}:generateContent?key=${encodeURIComponent(API_KEY)}`;

  const json = await fetchJson(url, {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 800,
    },
  });

  const text = extractTextFromGenerateContent(json);
  if (!text) throw new Error("No text returned from prompt enhancement model.");
  return { text, model: resolvedModel };
}

function buildEnhancerPrompt({ styleGuide, brief }) {
  return [
    "You are a senior prompt engineer for generative image models.",
    "Rewrite the user's brief into a high-control production prompt.",
    "",
    "RULES:",
    "- Output ONLY the final prompt text. No commentary, no markdown.",
    "- Be specific about composition, subject, camera/lighting (if relevant), typography treatment (if relevant), and negative constraints.",
    "- Keep brand colors and constraints strict.",
    "- Avoid illegal medical claims; prefer 'supports' language if referencing performance.",
    "",
    "BRAND / STYLE GUIDE:",
    styleGuide || "(none)",
    "",
    "USER BRIEF:",
    brief,
    "",
    "OUTPUT:",
  ].join("\n");
}

async function maybeEnhancePrompt({ prompt, enhance, stylePath, briefPath, textModel }) {
  if (!enhance) return { prompt, enhanced: false };

  const styleGuide = stylePath ? readTextFile(stylePath) : "";
  const brief = briefPath ? readTextFile(briefPath) : prompt;
  const enhancerPrompt = buildEnhancerPrompt({ styleGuide, brief });

  const { text, model } = await generateText({ prompt: enhancerPrompt, model: textModel || DEFAULT_TEXT_MODEL });
  return { prompt: text, enhanced: true, enhancerModel: model };
}

/**
 * Attempts a Gemini Image generation request.
 *
 * Because the exact schema differs depending on the model/endpoint version, we try a couple
 * of common request shapes and extract inline image data from the response.
 */
async function generateImageBase64({
  prompt,
  model = DEFAULT_IMAGE_MODEL,
  imagePaths = [],
}) {
  if (!API_KEY) die("Missing GEMINI_API_KEY env var.");

  // Gemini API (AI Studio) base:
  // https://generativelanguage.googleapis.com
  const base = "https://generativelanguage.googleapis.com/v1beta";

  const resolvedModel =
    model === "auto" || model === "latest" ? await pickLatestImageModel() : model;

  const url = `${base}/models/${encodeURIComponent(resolvedModel)}:generateContent?key=${encodeURIComponent(API_KEY)}`;

  const imageParts = imagePaths.map((p) => ({
    inline_data: {
      mime_type: extToMime(p),
      data: readBinaryBase64(p),
    },
  }));

  // Request shape A
  const bodyA = {
    contents: [{ role: "user", parts: [...imageParts, { text: prompt }] }],
    generationConfig: {
      // Some image-capable models accept response modalities.
      responseModalities: ["IMAGE"],
    },
  };

  // Request shape B (fallback)
  const bodyB = {
    contents: [{ parts: [...imageParts, { text: prompt }] }],
  };

  const errors = [];

  for (const body of [bodyA, bodyB]) {
    try {
      const json = await fetchJson(url, body);

      // Try to locate base64 image bytes in the response.
      // Common patterns:
      // - candidates[0].content.parts[].inline_data.data
      // - candidates[0].content.parts[].inlineData.data
      const parts =
        json?.candidates?.[0]?.content?.parts ||
        json?.candidates?.[0]?.content?.Parts ||
        [];

      for (const p of parts) {
        const inline = p.inline_data || p.inlineData || p.inline || null;
        const data = inline?.data;
        const mime = inline?.mime_type || inline?.mimeType;
        if (data && (mime?.includes("image") || !mime)) {
          return { base64: data, mimeType: mime || "image/png", model: resolvedModel };
        }
      }

      // Some models return images in a separate field.
      if (json?.images?.[0]?.bytesBase64Encoded) {
        return {
          base64: json.images[0].bytesBase64Encoded,
          mimeType: "image/png",
          model: resolvedModel,
        };
      }

      throw new Error(
        `No inline image data found in response. Keys: ${Object.keys(json).join(", ")}`
      );
    } catch (e) {
      errors.push(String(e));
    }
  }

  throw new Error(
    `Failed to generate image. Try setting GEMINI_IMAGE_MODEL to a known image-capable model.\n` +
      errors.map((e, i) => `Attempt ${i + 1}: ${e}`).join("\n")
  );
}

function mimeToExt(mime) {
  if (!mime) return "png";
  if (mime.includes("png")) return "png";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg";
  if (mime.includes("webp")) return "webp";
  return "png";
}

async function cmdImage(args) {
  const promptPath = args.prompt;
  const outPath = args.out;
  const model = args.model || DEFAULT_IMAGE_MODEL;
  const enhance = Boolean(args.enhance);
  const stylePath = args.style;
  const textModel = args.textModel || DEFAULT_TEXT_MODEL;
  const savePrompt = args.savePrompt;
  const imagePaths = [
    ...parseCommaList(args.image),
    ...parseCommaList(args.imageContext),
  ];

  if (!promptPath) die("Missing --prompt <path>");
  if (!outPath) die("Missing --out <path>");

  const rawPrompt = readTextFile(promptPath);
  const { prompt, enhanced, enhancerModel } = await maybeEnhancePrompt({
    prompt: rawPrompt,
    enhance,
    stylePath,
    textModel,
  });

  if (savePrompt) {
    const p = String(savePrompt);
    ensureDir(path.dirname(p));
    fs.writeFileSync(p, prompt + "\n");
    console.log(`Saved prompt: ${p}${enhanced && enhancerModel ? ` (enhanced via ${enhancerModel})` : ""}`);
  }

  const { base64, mimeType, model: usedModel } = await generateImageBase64({
    prompt,
    model,
    imagePaths,
  });

  const buf = Buffer.from(base64, "base64");
  const ext = mimeToExt(mimeType);

  const finalPath = outPath.endsWith(`.${ext}`) ? outPath : `${outPath}.${ext}`;
  ensureDir(path.dirname(finalPath));
  fs.writeFileSync(finalPath, buf);

  console.log(`Wrote: ${finalPath} (${mimeType}, ${buf.length} bytes)`);
  if (usedModel) console.log(`Model: ${usedModel}`);
  if (enhanced && enhancerModel) console.log(`Prompt enhanced via: ${enhancerModel}`);
}

async function cmdBatch(args) {
  const dir = args.dir;
  const outDir = args.outDir;
  const model = args.model || DEFAULT_IMAGE_MODEL;
  const enhance = Boolean(args.enhance);
  const stylePath = args.style;
  const textModel = args.textModel || DEFAULT_TEXT_MODEL;
  const imagePaths = [
    ...parseCommaList(args.image),
    ...parseCommaList(args.imageContext),
  ];

  if (!dir) die("Missing --dir <prompt-directory>");
  if (!outDir) die("Missing --outDir <output-directory>");

  ensureDir(outDir);

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".txt"))
    .sort();

  if (!files.length) die(`No .txt prompts found in ${dir}`);

  for (const f of files) {
    const rawPrompt = readTextFile(path.join(dir, f));
    const name = path.basename(f, ".txt");

    process.stdout.write(`Generating ${name}... `);
    const { prompt, enhanced, enhancerModel } = await maybeEnhancePrompt({
      prompt: rawPrompt,
      enhance,
      stylePath,
      textModel,
    });

    if (enhance) {
      const enhancedPath = path.join(outDir, `${name}.prompt.txt`);
      fs.writeFileSync(enhancedPath, prompt + "\n");
    }

    const { base64, mimeType, model: usedModel } = await generateImageBase64({
      prompt,
      model,
      imagePaths,
    });
    const ext = mimeToExt(mimeType);
    const outPath = path.join(outDir, `${name}.${ext}`);

    fs.writeFileSync(outPath, Buffer.from(base64, "base64"));
    console.log(
      `ok -> ${outPath}` +
        `${usedModel ? ` (model: ${usedModel})` : ""}` +
        `${enhanced && enhancerModel ? ` (enhanced via: ${enhancerModel})` : ""}`
    );
  }
}

async function cmdEnhance(args) {
  const promptPath = args.prompt;
  const outPath = args.out;
  const stylePath = args.style;
  const textModel = args.textModel || DEFAULT_TEXT_MODEL;

  if (!promptPath) die("Missing --prompt <path>");
  if (!outPath) die("Missing --out <path>");

  const rawPrompt = readTextFile(promptPath);
  const { prompt, enhanced, enhancerModel } = await maybeEnhancePrompt({
    prompt: rawPrompt,
    enhance: true,
    stylePath,
    textModel,
  });

  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, prompt + "\n");
  console.log(`Wrote: ${outPath}${enhanced && enhancerModel ? ` (enhanced via ${enhancerModel})` : ""}`);
}

function printKeyGuidance() {
  console.log(`\nAPI KEY TYPES\n\n`);
  console.log(
    `1) For IMAGE generation with Gemini API key (recommended starting point):\n` +
      `   - Get a "Gemini API key" from Google AI Studio (API Keys).\n` +
      `   - You will set it as GEMINI_API_KEY in your shell/.env.local.\n\n` +
      `2) For VIDEO generation (and sometimes higher-fidelity image models):\n` +
      `   - Usually requires Vertex AI with billing enabled and a Service Account JSON key.\n` +
      `   - This script currently does NOT implement Vertex auth; we can add that once you decide on Vertex.`
  );

  console.log(`\nCOST NOTES\n\n`);
  console.log(
    `Costs vary by model and output size/duration. The safest way to get exact numbers is:\n` +
      `- Check the current pricing page for the specific model you enable (Imagen / Gemini Flash Image / Veo).\n` +
      `- Then fill in the estimate fields below for local reporting.\n\n` +
      `Optional local estimates (set env vars for your own reporting):\n` +
      `- IMAGE_COST_USD (per image)\n` +
      `- VIDEO_COST_USD_PER_SEC (per second)\n`
  );
}

function printUsage() {
  console.log(`\nGenerate media via Gemini\n\n`);
  console.log(`Commands:`);
  console.log(
    `  image   --prompt <file.txt> --out <outputPathWithoutExt> [--model <modelName>] [--enhance] [--style <style.txt>] [--textModel <modelName>] [--savePrompt <path>] [--image <a.png,b.jpg>]`
  );
  console.log(
    `  batch   --dir <promptsDir>  --outDir <outputDir>        [--model <modelName>] [--enhance] [--style <style.txt>] [--textModel <modelName>] [--image <a.png,b.jpg>]`
  );
  console.log(
    `  enhance --prompt <file.txt> --out <file.txt>            [--style <style.txt>] [--textModel <modelName>]`
  );
  console.log(`  help`);
  console.log(`\nExamples:`);
  console.log(
    `  GEMINI_API_KEY=... node scripts/generate-media.mjs image --prompt prompts/media/hero-poster.txt --out public/generated/hero\n` +
      `  GEMINI_API_KEY=... node scripts/generate-media.mjs image --prompt prompts/media/hero-poster.txt --out public/generated/hero --enhance --style prompts/media/style-guide.txt --savePrompt public/generated/hero.prompt.txt\n` +
      `  GEMINI_API_KEY=... node scripts/generate-media.mjs batch --dir prompts/media --outDir public/generated --enhance --style prompts/media/style-guide.txt\n` +
      `  GEMINI_API_KEY=... node scripts/generate-media.mjs enhance --prompt prompts/media/hero-poster.txt --out public/generated/hero.enhanced.txt --style prompts/media/style-guide.txt\n`
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0] || "help";

  if (cmd === "help") {
    printUsage();
    printKeyGuidance();
    return;
  }

  if (cmd === "image") return await cmdImage(args);
  if (cmd === "batch") return await cmdBatch(args);
  if (cmd === "enhance") return await cmdEnhance(args);

  die(`Unknown command: ${cmd}`);
}

main().catch((e) => {
  console.error(String(e));
  process.exit(1);
});
