import { motion, useReducedMotion } from 'framer-motion'
import { profile } from './data'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

function App() {
  const reduceMotion = useReducedMotion()

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper text-ink">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 520px at 88% -5%, #ffe3d4 0%, transparent 55%), radial-gradient(700px 480px at 0% 20%, #f3eee6 0%, transparent 50%), linear-gradient(180deg, #faf7f2 0%, #f7f2ea 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.28] mix-blend-multiply"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          backgroundSize: '160px 160px',
        }}
      />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-2 pt-7 md:px-10 md:pt-9">
        <a
          href="#top"
          className="font-display text-xl tracking-tight text-ink transition-opacity hover:opacity-70"
        >
          Simon Huang
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium text-ink-soft">
          <a href="#about" className="transition-colors hover:text-ink">
            About
          </a>
          <a href="#work" className="transition-colors hover:text-ink">
            Work
          </a>
          <a
            href="#connect"
            className="rounded-full bg-orange px-4 py-2 text-paper transition-colors hover:bg-orange-deep"
          >
            Connect
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="relative mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-6xl items-end gap-10 px-6 pb-16 pt-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-12 md:px-10 md:pb-20 md:pt-10">
          <motion.div
            className="relative z-10 max-w-2xl"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
              },
            }}
          >
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mb-4 text-sm font-semibold tracking-[0.18em] text-orange uppercase"
            >
              {profile.role} · {profile.location}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={transition}
              className="font-display text-[clamp(3.4rem,10vw,6.75rem)] leading-[0.92] tracking-[-0.02em] text-ink"
            >
              Simon Huang
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mt-6 max-w-lg text-lg text-ink-soft text-balance md:text-xl"
            >
              {profile.tagline}
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={transition}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#connect"
                className="rounded-full bg-orange px-5 py-3 text-sm font-semibold text-paper transition hover:bg-orange-deep"
              >
                Get in touch
              </a>
              <a
                href="#work"
                className="rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition hover:border-orange hover:text-orange"
              >
                See selected work
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-md justify-self-end md:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full bg-orange/15 blur-3xl md:-inset-10"
            />
            <motion.img
              src={profile.avatar}
              alt="Simon Huang"
              width={400}
              height={400}
              className="aspect-square w-full rounded-[2rem] object-cover shadow-[0_24px_80px_-28px_rgba(255,77,0,0.45)]"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -10, 0] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </section>

        <section
          id="about"
          className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10 md:py-32"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            transition={transition}
          >
            <p className="text-sm font-semibold tracking-[0.16em] text-orange uppercase">
              About
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
              Quiet software.
              <br />
              <span className="italic text-ink-soft">Curious mind.</span>
            </h2>
          </motion.div>

          <motion.div
            className="space-y-5 text-lg leading-relaxed text-ink-soft"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
              },
            }}
          >
            {profile.about.map((paragraph) => (
              <motion.p key={paragraph} variants={fadeUp} transition={transition}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </section>

        <section className="border-y border-fog bg-sand/70">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-3 md:gap-8 md:px-10 md:py-24">
            {profile.focus.map((item, index) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{
                  ...transition,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-orange uppercase">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="work"
          className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10 md:py-32"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            transition={transition}
            className="mb-12 max-w-2xl"
          >
            <p className="text-sm font-semibold tracking-[0.16em] text-orange uppercase">
              Selected work
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl">
              What I’m building and thinking about
            </h2>
          </motion.div>

          <ul className="divide-y divide-fog">
            {profile.projects.map((project, index) => (
              <motion.li
                key={project.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{
                  ...transition,
                  delay: reduceMotion ? 0 : index * 0.06,
                }}
                className="grid gap-3 py-8 md:grid-cols-[7rem_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="text-sm font-medium text-orange">{project.year}</span>
                <div>
                  <h3 className="font-display text-2xl text-ink md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                    {project.description}
                  </p>
                </div>
                <span className="text-sm font-medium text-ink-soft">
                  {project.status}
                </span>
              </motion.li>
            ))}
          </ul>
        </section>

        <section
          id="connect"
          className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-10 md:pb-32"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            transition={transition}
            className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-paper md:px-14 md:py-16"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-orange/40 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-orange/25 blur-3xl"
            />
            <p className="text-sm font-semibold tracking-[0.16em] text-orange uppercase">
              Connect
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight md:text-5xl">
              Building something interesting? Let’s talk.
            </h2>
            <p className="mt-5 max-w-lg text-base text-paper/75">
              Open to thoughtful collaborations, early-stage ideas, and conversations about AI products.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
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
                  className="rounded-full border border-paper/20 bg-paper/5 px-5 py-3 text-sm font-semibold text-paper transition hover:border-orange hover:bg-orange hover:text-paper"
                >
                  {social.label}
                  <span className="ml-2 font-normal text-paper/65">
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-fog px-6 py-10 text-sm text-ink-soft md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Simon Huang</p>
        <p>Designed to stay quiet. Deployed on Cloudflare Pages.</p>
      </footer>
    </div>
  )
}

export default App
