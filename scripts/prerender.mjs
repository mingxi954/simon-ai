import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const server = await import(pathToFileURL(join(process.cwd(), 'dist-server/entry-server.js')).href)
const template = readFileSync(join(process.cwd(), 'dist/index.html'), 'utf8')

function escape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function document(rendered) {
  const canonical = `${server.site.url}${rendered.meta.path === '/' ? '' : rendered.meta.path}`
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(rendered.meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escape(rendered.meta.description)}" />`,
    )
    .replace('</head>', `    <link rel="canonical" href="${canonical}" />\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`)
}

function writePage(urlPath, file) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, document(server.render(urlPath)))
}

for (const route of server.publicRoutes()) {
  const file =
    route.path === '/'
      ? join(process.cwd(), 'dist/index.html')
      : join(process.cwd(), 'dist', route.path.slice(1), 'index.html')
  writePage(route.path, file)
}

writePage('/log', join(process.cwd(), 'dist/log/index.html'))
writePage('/missing-page', join(process.cwd(), 'dist/404.html'))

const data = server.records()
writeFileSync(join(process.cwd(), 'dist/profile.json'), `${JSON.stringify(data, null, 2)}\n`)

const urls = server.publicRoutes().map((route) => `${server.site.url}${route.path === '/' ? '/' : route.path}`)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`
writeFileSync(join(process.cwd(), 'dist/sitemap.xml'), sitemap)

const feedItems = data.entries
  .map(
    (entry) => `    <item>
      <title>${escape(entry.title)}</title>
      <link>${entry.url}</link>
      <guid>${entry.url}</guid>
      <pubDate>${entry.published}</pubDate>
      <description>${escape(entry.summary)}</description>
    </item>`,
  )
  .join('\n')
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(data.name)} — Writing</title>
    <link>${data.url}/writing</link>
    <description>Public notes.</description>
${feedItems}
  </channel>
</rss>
`
writeFileSync(join(process.cwd(), 'dist/writing/feed.xml'), feed)
