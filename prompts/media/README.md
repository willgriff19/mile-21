### Media generation prompts

- Put prompt `.txt` files in this folder.
- Run the generator:

```bash
# Single image
GEMINI_API_KEY="YOUR_KEY" node scripts/generate-media.mjs image \
  --prompt prompts/media/hero-poster.txt \
  --out public/generated/hero-poster

# Single image with prompt enhancement (recommended for control)
GEMINI_API_KEY="YOUR_KEY" node scripts/generate-media.mjs image \
  --prompt prompts/media/hero-poster.txt \
  --out public/generated/hero-poster-enhanced \
  --enhance \
  --style prompts/media/style-guide.txt \
  --savePrompt public/generated/hero-poster-enhanced.prompt.txt

# Batch all prompts in the folder
GEMINI_API_KEY="YOUR_KEY" node scripts/generate-media.mjs batch \
  --dir prompts/media \
  --outDir public/generated

# Batch with enhancement (writes a .prompt.txt per asset)
GEMINI_API_KEY="YOUR_KEY" node scripts/generate-media.mjs batch \
  --dir prompts/media \
  --outDir public/generated \
  --enhance \
  --style prompts/media/style-guide.txt
```

### Key type you should create
For this script: **Google AI Studio “Gemini API key”** (an API key string).

If you want video generation later: we’ll likely switch to **Vertex AI** and use a **Service Account JSON** key.

### “Tell you what I want → enhance → generate” workflow
1) Write a short brief prompt (fast and messy is fine).
2) Run with `--enhance` + `--style prompts/media/style-guide.txt`.
3) Inspect the saved `.prompt.txt` file, tweak if needed, regenerate.
