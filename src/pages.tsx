import {
  entries,
  entriesForProject,
  entryPath,
  formatDate,
  nowSnapshot,
  profile,
  projectPath,
  projects,
  type Project,
} from './content'
import { renderMarkdown } from './content/markdown'
import { Kicker, Prose, Shell } from './components/Shell'
export function HomePage() {
  const recent = entries.slice(0, 3)
  return (
    <Shell path="/">
      <section className="pt-14 md:pt-20">
        <Kicker>— About · Simon</Kicker>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-ink md:text-6xl">
          {profile.name}
        </h1>
        <Prose>
          <div className="mt-6 space-y-5">
            {profile.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Prose>
      </section>

      <section className="mt-16 md:mt-20">
        <Kicker>— Now</Kicker>
        <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
          {`Updated ${formatDate(nowSnapshot.updated)}`}
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {nowSnapshot.focuses.map((focus) => (
            <li key={focus.title} className="rounded-2xl border border-fog bg-card px-5 py-5">
              <h3 className="text-lg font-semibold">{focus.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{focus.detail}</p>
            </li>
          ))}
        </ul>
        <a href="/now" className="mt-5 inline-block text-sm font-semibold text-orange">
          Read the Now page
        </a>
      </section>

      <section id="work" className="mt-16 md:mt-20">
        <Kicker>— Projects</Kicker>
        <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">In progress</h2>
        <div className="mt-6 grid gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} number={index + 1} />
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Scuba and skiing stay off the site until there is a real milestone to publish.
        </p>
      </section>

      <section className="mt-16 md:mt-20">
        <Kicker>— Writing</Kicker>
        <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">Recent notes</h2>
        {recent.length === 0 ? (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            No public notes yet.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-fog rounded-2xl border border-fog bg-card">
            {recent.map((entry) => (
              <li key={entry.slug} className="px-5 py-5">
                <a href={entryPath(entry)} className="text-lg font-semibold hover:text-orange">
                  {entry.title}
                </a>
                <p className="mt-1 text-sm text-ink-soft">
                  {formatDate(entry.published)} · {entry.format}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{entry.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="connect" className="mt-16 md:mt-20">
        <div className="rounded-2xl bg-ink px-6 py-10 text-paper md:px-10 md:py-12">
          <p className="text-sm font-medium tracking-[0.12em] text-orange uppercase">— Connect</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
            Building something worth showing? Write.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {profile.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-deep"
              >
                {social.label}
                <span className="ml-2 font-normal text-white/80">{social.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  )
}

function ProjectCard({ project, number }: { project: Project; number: number }) {
  const label = String(number).padStart(2, '0')
  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-[#eadfce] bg-card-warm px-6 py-7 shadow-[0_18px_50px_-28px_rgba(90,60,30,0.45)] md:px-8 md:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 right-0 h-28 w-40 rounded-full border-[10px] border-[#8eae96]/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/3 h-24 w-40 rounded-full border-[8px] border-[#8aa0b8]/60"
      />
      <div className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1.35fr)_220px]">
        <div>
          <p className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.16em] text-[#8a5a32] uppercase">
            <span>{`No. ${label}`}</span>
            <span aria-hidden className="h-px w-8 bg-[#d7c4a8]" />
            <span className="font-medium tracking-normal text-ink-soft normal-case">
              {`Updated ${formatDate(project.updated)}`}
            </span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#8a5a32] px-3 py-1 text-xs font-semibold text-[#fbf6ee]">
              {project.status}
            </span>
            <span className="rounded-full border border-[#d7c4a8] px-3 py-1 text-xs font-medium text-[#8a5a32]">
              Milestone
            </span>
          </div>
          <h3 className="mt-5 font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">{project.summary}</p>
          {project.learned[0] ? (
            <p className="mt-5 border-t border-[#eadfce] pt-4 text-sm leading-relaxed text-[#8a5a32]">
              {project.learned[0]}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-ink-soft uppercase">
              In progress
              <span className="mt-1 block text-sm font-medium tracking-normal text-ink-soft normal-case">
                {formatDate(project.updated)}
              </span>
            </p>
            <a
              href={projectPath(project)}
              className="inline-flex items-center gap-2 rounded-xl bg-rust px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a83b26]"
            >
              Open
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
        <ProjectCover project={project} label={label} />
      </div>
    </article>
  )
}

function ProjectCover({ project, label }: { project: Project; label: string }) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px]">
      <div
        aria-hidden
        className="absolute -top-3 right-2 h-10 w-10 rounded-full border-4 border-[#e0b089]"
      />
      <div className="absolute inset-0 rounded-2xl bg-[#f3efe6] shadow-[0_16px_30px_-18px_rgba(60,40,20,0.55)]">
        <div className="flex h-full flex-col justify-between p-5">
          <div>
            <div className="h-1.5 w-10 rounded-full bg-rust" />
            <p className="mt-6 font-display text-2xl leading-tight text-ink">{project.title}</p>
          </div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#8a5a32] uppercase">
            {`No. ${label}`}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ProjectsPage() {
  return (
    <Shell path="/projects">
      <section className="pt-14 md:pt-20">
        <Kicker>— Projects</Kicker>
        <h1 className="mt-4 font-display text-5xl tracking-tight">Ongoing work</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
          Only projects with something real to show are listed. The rest wait.
        </p>
        <div className="mt-8 grid gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} number={index + 1} />
          ))}
        </div>
      </section>
    </Shell>
  )
}

export function ProjectPage({ project }: { project: Project }) {
  const related = entriesForProject(project.id)
  return (
    <Shell path={projectPath(project)}>
      <article className="pt-14 md:pt-20">
        <Kicker>— Project · {project.status}</Kicker>
        <h1 className="mt-4 font-display text-5xl tracking-tight">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">{project.summary}</p>
        <p className="mt-3 text-sm text-ink-soft">{`Updated ${formatDate(project.updated)}`}</p>

        <section className="mt-12 max-w-2xl">
          <h2 className="font-display text-3xl">Why this matters</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">{project.motivation}</p>
        </section>
        <section className="mt-10 max-w-2xl">
          <h2 className="font-display text-3xl">Where I am</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">{project.now}</p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-3xl">What I have done</h2>
          <ol className="mt-4 divide-y divide-fog rounded-2xl border border-fog bg-card">
            {project.milestones.map((milestone) => (
              <li key={milestone.title} className="px-5 py-5">
                <p className="text-sm font-medium text-orange">{formatDate(milestone.date)}</p>
                <h3 className="mt-1 text-lg font-semibold">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{milestone.detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="mt-10 max-w-2xl">
          <h2 className="font-display text-3xl">What I have learned</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-ink-soft">
            {project.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mt-10 max-w-2xl">
          <h2 className="font-display text-3xl">What comes next</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">{project.next}</p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-3xl">Notes</h2>
          {related.length === 0 ? (
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">No public notes for this project yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {related.map((entry) => (
                <li key={entry.slug}>
                  <a href={entryPath(entry)} className="font-semibold hover:text-orange">
                    {entry.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>
    </Shell>
  )
}

export function WritingPage() {
  return (
    <Shell path="/writing">
      <section className="pt-14 md:pt-20">
        <Kicker>— Writing</Kicker>
        <h1 className="mt-4 font-display text-5xl tracking-tight">Notes</h1>
        {entries.length === 0 ? (
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
            No public notes yet. A note appears here after it is added as a Markdown file.
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-fog rounded-2xl border border-fog bg-card">
            {entries.map((entry) => (
              <li key={entry.slug} className="px-5 py-5 md:px-7">
                <a href={entryPath(entry)} className="text-lg font-semibold hover:text-orange">
                  {entry.title}
                </a>
                <p className="mt-1 text-sm text-ink-soft">
                  {formatDate(entry.published)} · {entry.format}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{entry.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Shell>
  )
}

export function EntryPage({ slug }: { slug: string }) {
  const entry = entries.find((item) => item.slug === slug)
  if (!entry) return <NotFoundPage />
  const project = projects.find((item) => item.id === entry.projectId)
  return (
    <Shell path={entryPath(entry)}>
      <article className="reading pt-14 md:pt-20">
        <Kicker>— {entry.format}</Kicker>
        <h1 className="mt-4 max-w-2xl font-display text-5xl tracking-tight">{entry.title}</h1>
        <p className="mt-4 text-sm text-ink-soft">
          {formatDate(entry.published)}
          {entry.updated ? ` · Updated ${formatDate(entry.updated)}` : ''}
          {project ? (
            <>
              {' '}
              · <a href={projectPath(project)} className="text-orange">{project.title}</a>
            </>
          ) : null}
        </p>
        <div
          className="mt-8 max-w-2xl space-y-4 text-[17px] leading-relaxed text-ink-soft [&_a]:text-orange [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(entry.body) }}
        />
      </article>
    </Shell>
  )
}

export function NowPage() {
  return (
    <Shell path="/now">
      <section className="pt-14 md:pt-20">
        <Kicker>— Now</Kicker>
        <h1 className="mt-4 font-display text-5xl tracking-tight">What has my attention</h1>
        <p className="mt-4 text-sm text-ink-soft">{`Updated ${formatDate(nowSnapshot.updated)}`}</p>
        <ol className="mt-8 max-w-2xl space-y-6">
          {nowSnapshot.focuses.map((focus, index) => {
            const project = projects.find((item) => item.id === focus.projectId)
            return (
              <li key={focus.title}>
                <p className="text-xs font-semibold tracking-[0.14em] text-orange uppercase">
                  0{index + 1}
                </p>
                <h2 className="mt-2 font-display text-3xl">{focus.title}</h2>
                <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">{focus.detail}</p>
                {project ? (
                  <a href={projectPath(project)} className="mt-2 inline-block text-sm font-semibold text-orange">
                    {project.title}
                  </a>
                ) : null}
              </li>
            )
          })}
        </ol>
      </section>
    </Shell>
  )
}

export function NotFoundPage() {
  return (
    <Shell path="">
      <section className="pt-14 md:pt-20">
        <Kicker>— 404</Kicker>
        <h1 className="mt-4 font-display text-5xl tracking-tight">Page not found</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
          That address is not a project, a note, or the Now page.
        </p>
        <a href="/" className="mt-6 inline-block text-sm font-semibold text-orange">
          Back home
        </a>
      </section>
    </Shell>
  )
}
