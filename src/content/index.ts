import { entries } from './entries'
import { nowSnapshot } from './now'
import { profile } from './profile'
import { projects } from './projects'
import type { Entry, Project } from './types'

export type { Entry, Project }

export const site = {
  url: 'https://simon-ai.pages.dev',
  name: profile.name,
}

const datePattern = /^\d{4}-\d{2}-\d{2}$/
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message)
}

export function validateContent() {
  assert(profile.name.trim().length > 0, 'Profile needs a name')
  assert(profile.introduction.length > 0, 'Profile needs an introduction')
  assert(profile.socials.length > 0, 'Profile needs a contact link')

  const ids = new Set<string>()
  const slugs = new Set<string>()
  for (const project of projects) {
    assert(!ids.has(project.id), `Duplicate project id ${project.id}`)
    assert(!slugs.has(project.slug), `Duplicate project slug ${project.slug}`)
    ids.add(project.id)
    slugs.add(project.slug)
    assert(slugPattern.test(project.slug), `Bad project slug ${project.slug}`)
    assert(datePattern.test(project.updated), `Bad project date ${project.slug}`)
    assert(project.motivation.trim().length > 0, `${project.slug} needs a motivation`)
    assert(project.milestones.length > 0, `${project.slug} needs a milestone`)
    for (const milestone of project.milestones) {
      assert(datePattern.test(milestone.date), `Bad milestone date on ${project.slug}`)
    }
  }

  const entrySlugs = new Set<string>()
  for (const entry of entries) {
    assert(slugPattern.test(entry.slug), `Bad entry slug ${entry.slug}`)
    assert(!entrySlugs.has(entry.slug), `Duplicate entry slug ${entry.slug}`)
    entrySlugs.add(entry.slug)
    assert(datePattern.test(entry.published), `Bad published date on ${entry.slug}`)
    assert(!entry.updated || datePattern.test(entry.updated), `Bad updated date on ${entry.slug}`)
    assert(entry.title.trim().length > 0, `${entry.slug} needs a title`)
    assert(entry.body.trim().length > 0, `${entry.slug} needs a body`)
    if (entry.projectId) {
      assert(ids.has(entry.projectId), `${entry.slug} points at unknown project ${entry.projectId}`)
    }
  }

  assert(datePattern.test(nowSnapshot.updated), 'Now page needs an update date')
  assert(nowSnapshot.focuses.length >= 3 && nowSnapshot.focuses.length <= 5, 'Now page needs 3 to 5 focuses')
  for (const focus of nowSnapshot.focuses) {
    if (focus.projectId) {
      assert(ids.has(focus.projectId), `Now focus points at unknown project ${focus.projectId}`)
    }
  }
}

validateContent()

export function formatDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function projectPath(project: Project) {
  return `/projects/${project.slug}`
}

export function entryPath(entry: Entry) {
  return `/writing/${entry.slug}`
}

export function entriesForProject(projectId: string) {
  return entries.filter((entry) => entry.projectId === projectId)
}

export function normalizePath(path: string) {
  const bare = path.split('?')[0]?.split('#')[0] ?? '/'
  if (bare.length > 1 && bare.endsWith('/')) return bare.slice(0, -1)
  return bare || '/'
}

export type PageMeta = {
  path: string
  title: string
  description: string
}

export function pageMeta(path: string): PageMeta {
  const normal = normalizePath(path)
  if (normal === '/') {
    return {
      path: '/',
      title: profile.name,
      description: `${profile.name}, ${profile.role} in ${profile.location}. Projects, notes, and what has his attention now.`,
    }
  }
  if (normal === '/projects') {
    return {
      path: normal,
      title: `Projects · ${profile.name}`,
      description: 'Ongoing public projects.',
    }
  }
  if (normal === '/writing') {
    return {
      path: normal,
      title: `Writing · ${profile.name}`,
      description: 'Essays and notes.',
    }
  }
  if (normal === '/now') {
    return {
      path: normal,
      title: `Now · ${profile.name}`,
      description: `What has ${profile.name}'s attention, updated ${formatDate(nowSnapshot.updated)}.`,
    }
  }
  if (normal === '/log') {
    return {
      path: normal,
      title: `Log · ${profile.name}`,
      description: 'Private log for weight, sleep, meals, and workouts.',
    }
  }
  const project = projects.find((item) => normal === projectPath(item))
  if (project) {
    return {
      path: normal,
      title: `${project.title} · ${profile.name}`,
      description: project.summary,
    }
  }
  const entry = entries.find((item) => normal === entryPath(item))
  if (entry) {
    return {
      path: normal,
      title: `${entry.title} · ${profile.name}`,
      description: entry.summary,
    }
  }
  return {
    path: normal,
    title: `Not found · ${profile.name}`,
    description: 'That page is not on this site.',
  }
}

export function publicRoutes(): PageMeta[] {
  return [
    pageMeta('/'),
    pageMeta('/projects'),
    ...projects.map((project) => pageMeta(projectPath(project))),
    pageMeta('/writing'),
    ...entries.map((entry) => pageMeta(entryPath(entry))),
    pageMeta('/now'),
  ]
}

export { entries, nowSnapshot, profile, projects }
