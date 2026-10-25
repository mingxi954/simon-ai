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
import { LifeLog } from './life/LifeLog'

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
        <div className="mt-6 grid gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={projectPath(project)}
      className="block rounded-2xl border border-fog bg-card px-5 py-6 transition hover:border-orange/40 md:px-7"
    >
      <p className="text-xs font-semibold tracking-[0.14em] text-orange uppercase">{project.status}</p>
      <h3 className="mt-2 font-display text-3xl">{project.title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{project.summary}</p>
      <p className="mt-3 text-sm text-ink-soft">{`Updated ${formatDate(project.updated)}`}</p>
    </a>
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
        <div className="mt-8 grid gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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

export function LogPage() {
  return (
    <Shell path="/log">
      <LifeLog />
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
