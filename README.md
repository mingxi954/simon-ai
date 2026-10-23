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

## Customize

Edit profile copy, projects, and links in `src/data.ts`.
