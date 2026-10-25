import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'
import { entries, nowSnapshot, pageMeta, profile, projects, publicRoutes, site } from './content'

export function render(url: string) {
  const meta = pageMeta(url)
  const html = renderToString(
    <StrictMode>
      <App url={url} />
    </StrictMode>,
  )
  return { html, meta }
}

export function records() {
  return {
    schemaVersion: 1,
    name: profile.name,
    url: site.url,
    updated: nowSnapshot.updated,
    projects: projects.map((project) => ({
      id: project.id,
      title: project.title,
      summary: project.summary,
      status: project.status,
      updated: project.updated,
      url: `${site.url}/projects/${project.slug}`,
    })),
    entries: entries.map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      summary: entry.summary,
      published: entry.published,
      projectId: entry.projectId ?? null,
      url: `${site.url}/writing/${entry.slug}`,
    })),
  }
}

export { publicRoutes, site }
