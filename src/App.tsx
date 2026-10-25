import {
  entries,
  normalizePath,
  projectPath,
  projects,
} from './content'
import {
  EntryPage,
  HomePage,
  NotFoundPage,
  LogPage,
  NowPage,
  ProjectPage,
  ProjectsPage,
  WritingPage,
} from './pages'

export function App({ url }: { url?: string }) {
  const path = normalizePath(url ?? window.location.pathname)
  if (path === '/') return <HomePage />
  if (path === '/projects') return <ProjectsPage />
  if (path === '/writing') return <WritingPage />
  if (path === '/now') return <NowPage />
  if (path === '/log') return <LogPage />
  const project = projects.find((item) => path === projectPath(item))
  if (project) return <ProjectPage project={project} />
  const entrySlug = path.startsWith('/writing/') ? path.slice('/writing/'.length) : ''
  if (entrySlug && entries.some((entry) => entry.slug === entrySlug)) {
    return <EntryPage slug={entrySlug} />
  }
  return <NotFoundPage />
}
