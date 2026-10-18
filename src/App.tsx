import { motion, useReducedMotion } from 'framer-motion'
import { profile } from './data'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

function App() {
  const reduceMotion = useReducedMotion()

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-fog/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img
              src={profile.avatar}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white"
            />
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-semibold tracking-tight text-ink">
                Simon Huang
              </span>
              <span className="block truncate text-[11px] font-medium tracking-[0.14em] text-ink-soft uppercase">
                Software Engineer
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="#work"
              className="hidden rounded-full border border-fog bg-card px-4 py-2 text-sm font-medium text-ink transition hover:border-ink/20 sm:inline-flex"
            >
              Work
            </a>
            <a
              href="#connect"
              className="rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-deep"
            >
              Connect
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-5xl px-5 pb-20 md:px-8">
        <motion.section
          id="about"
          className="pt-14 md:pt-20"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
            },
          }}
        >
          <motion.p
            variants={fadeUp}
            transition={transition}
            className="text-sm font-medium tracking-[0.12em] text-ink-soft uppercase"
          >
            — About · Simon
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={transition}
            className="mt-6 max-w-3xl space-y-5 text-[17px] leading-relaxed text-ink-soft md:text-lg"
          >
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              Based in {profile.location}. {profile.tagline}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={transition}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/85"
            >
              Selected work
              <span aria-hidden className="text-base leading-none">
                ↓
              </span>
            </a>
            <a
              href={profile.socials[0].href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-fog bg-card px-5 py-2.5 text-sm font-medium text-ink transition hover:border-ink/20"
            >
              <img
                src={profile.avatar}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
              />
              @{profile.socials[0].handle.replace('@', '')}
            </a>
          </motion.div>
        </motion.section>

        <motion.section
          className="mt-16 md:mt-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={transition}
        >
          <div className="overflow-hidden rounded-2xl border border-fog bg-card shadow-[0_12px_40px_-24px_rgba(28,25,23,0.35)]">
            <div className="flex items-center justify-between border-b border-fog px-5 py-4 md:px-7">
              <h2 className="text-base font-semibold text-ink">Focus</h2>
              <p className="text-xs font-medium tracking-[0.12em] text-ink-soft uppercase">
                Now
              </p>
            </div>
            <div className="grid divide-y divide-fog md:grid-cols-3 md:divide-x md:divide-y-0">
              {profile.focus.map((item, index) => (
                <article key={item.title} className="px-5 py-6 md:px-7">
                  <p className="text-xs font-semibold tracking-[0.14em] text-orange uppercase">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <section id="work" className="mt-16 md:mt-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={transition}
            className="mb-5 flex items-end justify-between gap-4"
          >
            <div>
              <p className="text-sm font-medium tracking-[0.12em] text-ink-soft uppercase">
                — Selected work
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-ink md:text-4xl">
                Building & thinking
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={transition}
            className="overflow-hidden rounded-2xl border border-fog bg-card shadow-[0_12px_40px_-24px_rgba(28,25,23,0.35)]"
          >
            <ul className="divide-y divide-fog">
              {profile.projects.map((project) => (
                <li
                  key={project.title}
                  className="grid gap-2 px-5 py-6 transition hover:bg-paper/60 md:grid-cols-[6rem_1fr_auto] md:items-baseline md:gap-6 md:px-7"
                >
                  <span className="text-sm font-medium text-orange">
                    {project.year}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {project.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-ink-soft">
                    {project.status}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        <motion.section
          id="connect"
          className="mt-16 md:mt-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          transition={transition}
        >
          <div className="overflow-hidden rounded-2xl border border-fog bg-ink px-6 py-10 text-paper md:px-10 md:py-12">
            <p className="text-sm font-medium tracking-[0.12em] text-orange uppercase">
              — Connect
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl">
              Building something interesting? Let’s talk.
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-paper/70">
              Open to thoughtful collaborations, early-stage ideas, and conversations about AI products.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    social.href.startsWith('http')
                      ? 'noreferrer noopener'
                      : undefined
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-deep"
                >
                  {social.label === 'X' && (
                    <img
                      src={profile.avatar}
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] rounded-full object-cover"
                    />
                  )}
                  {social.handle}
                </a>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-fog">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-ink-soft md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Simon Huang</p>
          <p>Cloudflare Pages</p>
        </div>
      </footer>
    </div>
  )
}

export default App
