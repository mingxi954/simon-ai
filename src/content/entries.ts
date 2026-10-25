import type { Entry, EntryFormat } from './types'

const files = import.meta.glob('./entries/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function field(block: string, name: string) {
  const match = block.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))
  return match?.[1]?.trim() ?? ''
}

function parseEntry(file: string, source: string): Entry {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw new Error(`${file} needs front matter between --- lines`)
  }
  const front = match[1]
  const format = field(front, 'format')
  if (format !== 'essay' && format !== 'note') {
    throw new Error(`${file} format must be essay or note`)
  }
  const tags = field(front, 'tags')
  const projectId = field(front, 'project')
  const updated = field(front, 'updated')
  return {
    slug: field(front, 'slug'),
    title: field(front, 'title'),
    summary: field(front, 'summary'),
    published: field(front, 'published'),
    updated: updated || undefined,
    projectId: projectId || undefined,
    format: format as EntryFormat,
    tags: tags ? tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
    body: match[2].trim(),
  }
}

export const entries: readonly Entry[] = Object.entries(files)
  .map(([file, source]) => parseEntry(file, String(source)))
  .sort((a, b) => b.published.localeCompare(a.published))
