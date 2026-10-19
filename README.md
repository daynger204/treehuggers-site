# Treehuggers Winnipeg website

Static rebuild of [treehuggerswinnipeg.com](https://www.treehuggerswinnipeg.com) (off Squarespace).
Faithful 1:1 visual rebuild — not a redesign.

## Stack

- [Astro](https://astro.build) (static output)
- Deploy target: **Cloudflare Pages**
  - Build command: `npm run build`
  - Output directory: `dist`
- Redirects: `public/_redirects` (`/home` → `/`, `/services` → `/what-we-do`, both 301)


## Content (CMS-ready)

Page copy, FAQ Q&As, and image references live in **Astro content collections** under `src/content/`:

- `src/content/pages/*.md` — SEO fields, image refs, structured blocks / services / quote / links
- `src/content/faq/*.md` — one file per FAQ (frontmatter `question` + `order`, body = answer)
- `src/content.config.ts` — schemas
- `src/lib/images.ts` — maps filename → imported asset (add a line when adding a new image file)

Layout and styles stay in `src/layouts`, `src/components`, and `src/styles`. A git-based CMS (Decap, TinaCMS, or Pages CMS) can edit the markdown later without touching components.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes to dist/
npm run preview  # serve dist/
```

Node.js **≥ 22.22** required.

## Fonts

- **Body:** Work Sans (Google Fonts)
- **Display / buttons:** Fraunces (Google Fonts) standing in for New Spirit.
  New Spirit is commercial; a web licence was not verified in the capture.
  Swap later by changing `--font-display` in `src/styles/global.css` and the Google Fonts link in `BaseLayout.astro`.

## Tracking

Google Analytics, Google Ads, and the Meta Pixel are **not** included.
IDs are listed in a commented placeholder in `src/layouts/BaseLayout.astro`. Enable only with DA's yes.

## Content sources

Copied from the read-only capture under `../capture/` (2026-10-19).
Do not invent prices, testimonials, or metrics.

## Jobber

`/book-now` embeds the Jobber work-request form with the same snippet as the live Squarespace site.
Client Hub login: header **CLIENT LOGIN** button.
