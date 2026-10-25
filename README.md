# Simon Huang — personal site

A clean personal website for [Simon Huang](https://x.com/SimonHuang7834), built with Vite, React, and Tailwind, ready for Cloudflare Pages.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3847](http://localhost:3847).

## Build

```bash
npm run build
npm run preview
```

## Deploy to Cloudflare Pages

1. Install dependencies and sign in to Cloudflare:

```bash
npm install
npx wrangler login
```

2. Deploy:

```bash
npm run deploy
```

Or connect this repo in the [Cloudflare dashboard](https://dash.cloudflare.com/) with:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

`wrangler.toml` publishes the `dist` folder as static assets, so Cloudflare does not need a Worker script.

## Content

Profile, projects, and the Now page live in `src/content/`. A public note is a Markdown file in `src/content/entries/` with front matter:

```markdown
---
slug: example-note
title: Example note
summary: One sentence.
published: 2026-10-24
format: note
project: engineering-ai
tags: ai
---

The note itself.
```

`project` and `tags` are optional. The build checks dates, slugs, and project ids. Do not invent milestones, travel, or other biography to fill a page.

## Customize

The live site the build links to is [simon-ai.pages.dev](https://simon-ai.pages.dev).
