import type { ReactNode } from 'react'
import { profile } from '../content'

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/now', label: 'Now' },
  { href: '/#connect', label: 'Connect' },
]

export function Shell({ path, children }: { path: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-fog/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-3.5 md:px-8">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <img
              src={profile.avatar}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white"
            />
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-semibold tracking-tight">
                {profile.name}
              </span>
              <span className="block truncate text-[11px] font-medium tracking-[0.14em] text-ink-soft uppercase">
                {profile.role}
              </span>
            </span>
          </a>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
            {links.map((link) => {
              const current = link.href === path
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={current ? 'page' : undefined}
                  className={current ? 'text-orange' : 'text-ink-soft hover:text-ink'}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-5 pb-20 md:px-8">{children}</main>
      <footer className="border-t border-fog">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-ink-soft md:flex-row md:items-center md:justify-between md:px-8">
          <p>{`© ${new Date().getFullYear()} ${profile.name}`}</p>
          <p>Cloudflare Pages</p>
        </div>
      </footer>
    </div>
  )
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-medium tracking-[0.12em] text-ink-soft uppercase">{children}</p>
  )
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-2xl space-y-5 text-[17px] leading-relaxed text-ink-soft">{children}</div>
}
