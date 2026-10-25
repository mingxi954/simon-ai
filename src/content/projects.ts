import type { Project } from './types'

export const projects: readonly Project[] = [
  {
    id: 'engineering-ai',
    slug: 'engineering-ai',
    title: 'Engineering and AI',
    summary:
      'Software I build with AI, limited to work I can show. Notes and experiments land here once they are real.',
    status: 'Active',
    motivation:
      'I want the tools, decisions, and lessons in one public place, not scattered across chats and repos.',
    now: 'Turning this website into that place, with its own page for each project and a home for notes.',
    milestones: [
      {
        date: '2026-10-18',
        title: 'First public version',
        detail:
          'This site went up on Cloudflare Pages. It was one scrolling page. These project and note addresses come after that.',
      },
    ],
    learned: [
      'A single scrolling page cannot be shared as one project or one note.',
      'A project page waits until there is a real milestone to put on it.',
    ],
    next: 'Publish one experiment writeup when I have one worth keeping.',
    updated: '2026-10-24',
  },
]
