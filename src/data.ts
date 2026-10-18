export const profile = {
  name: 'Simon Huang',
  role: 'Software engineer',
  location: 'San Francisco',
  tagline: 'Building with AI. Exploring startups, books, and ideas.',
  about: [
    'I write software at the edge of what models make newly possible — products that feel quiet, useful, and a little ahead of the curve.',
    'When I’m not shipping, I’m reading, sketching company ideas, and sharing what I learn along the way.',
  ],
  email: 'mh954@cornell.edu',
  socials: [
    {
      label: 'X',
      href: 'https://x.com/SimonHuang7834',
      handle: '@SimonHuang7834',
    },
    {
      label: 'Email',
      href: 'mailto:mh954@cornell.edu',
      handle: 'mh954@cornell.edu',
    },
  ],
  focus: [
    {
      title: 'AI products',
      body: 'Interfaces and systems that put language models to work without the noise.',
    },
    {
      title: 'Startups',
      body: 'Early ideas, sharp problems, and the discipline of shipping before it’s perfect.',
    },
    {
      title: 'Writing',
      body: 'Notes on books, builders, and the craft of learning in public.',
    },
  ],
  projects: [
    {
      title: 'Personal experiments',
      year: 'Now',
      description:
        'Small tools and agents that help me think, write, and build faster — often open for early testers.',
      status: 'Active',
    },
    {
      title: 'Learning in public',
      year: 'Ongoing',
      description:
        'Threads and notes on AI, startups, and books — distilled into what I’d tell a friend.',
      status: 'Writing',
    },
    {
      title: 'Next venture',
      year: 'Soon',
      description:
        'Looking for a problem worth years of focus. If you’re building something adjacent, say hello.',
      status: 'Open',
    },
  ],
} as const
