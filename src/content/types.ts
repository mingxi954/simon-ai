export type SocialLink = {
  label: string
  href: string
  handle: string
}

export type Profile = {
  name: string
  role: string
  location: string
  avatar: string
  email: string
  introduction: readonly string[]
  socials: readonly SocialLink[]
}

export type Milestone = {
  date: string
  title: string
  detail: string
}

export type Project = {
  id: string
  slug: string
  title: string
  summary: string
  status: string
  motivation: string
  now: string
  milestones: readonly Milestone[]
  learned: readonly string[]
  next: string
  updated: string
}

export type EntryFormat = 'essay' | 'note'

export type Entry = {
  slug: string
  title: string
  summary: string
  published: string
  updated?: string
  projectId?: string
  format: EntryFormat
  tags: readonly string[]
  body: string
}

export type NowFocus = {
  title: string
  detail: string
  projectId?: string
}

export type NowSnapshot = {
  updated: string
  focuses: readonly NowFocus[]
}
