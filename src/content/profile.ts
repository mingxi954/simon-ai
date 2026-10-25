import type { Profile } from './types'

export const profile: Profile = {
  name: 'Simon Huang',
  role: 'Software engineer',
  location: 'San Francisco',
  avatar: '/avatar.jpg',
  email: 'mh954@cornell.edu',
  introduction: [
    'I build software with AI, and I learn in public. This site is where that work can be read on its own: projects I can show, notes I am willing to stand behind, and a short account of what has my attention.',
    'I am based in San Francisco. 来自深圳',
  ],
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
}
