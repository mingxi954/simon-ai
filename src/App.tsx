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
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 md:px-10 md:py-9">
          <a
            href="#top"
            className="font-display text-xl tracking-tight text-paper transition-opacity hover:opacity-70"
          >
            Simon Huang
          </a>
          <nav className="flex items-center gap-6 text-sm font-medium text-mist">
            <a href="#about" className="transition-colors hover:text-paper">
              About
            </a>
            <a href="#work" className="transition-colors hover:text-paper">
              Work
            </a>
            <a
              href="#connect"
              className="rounded-full bg-paper px-4 py-2 text-ink transition-colors hover:bg-mist"
            >
              Connect
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section
          className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-24"
          style={{
            background:
              'linear-gradient(145deg, #0c1815 0%, #16332c 28%, #2a4f45 62%, #4f7f6f 88%, #7eab9a 100%)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse at 72% 22%, rgba(255,255,255,0.28), transparent 42%), radial-gradient(ellipse at 18% 78%, rgba(9,18,16,0.55), transparent 48%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-soft-light"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.55\'/%3E%3C/svg%3E")',
              backgroundSize: '180px 180px',
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-16 bottom-[-10%] h-72 w-72 rounded-full bg-glow/25 blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, 36, 0], y: [0, -22, 0], opacity: [0.3, 0.5, 0.3] }
            }
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[-8%] top-[18%] h-56 w-56 rounded-full bg-paper/10 blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, -24, 0], y: [0, 18, 0], opacity: [0.2, 0.4, 0.2] }
            }
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="relative z-10 mx-auto w-full max-w-6xl text-paper"
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
              className="mb-4 text-sm font-medium tracking-[0.18em] text-mist/90 uppercase"
            >
              {profile.role} · {profile.location}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={transition}
              className="font-display text-[clamp(3.6rem,12vw,7.5rem)] leading-[0.9] tracking-[-0.02em]"
            >
              Simon Huang
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mt-6 max-w-xl text-lg text-mist/95 text-balance md:text-xl"
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
                className="rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
              >
                Get in touch
              </a>
              <a
                href="#work"
                className="rounded-full border border-paper/35 px-5 py-3 text-sm font-semibold text-paper transition hover:border-paper/70 hover:bg-paper/10"
              >
                See selected work
              </a>
            </motion.div>
          </motion.div>
        </section>

        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-20"
          style={{
            background:
              'radial-gradient(1000px 600px at 8% 0%, #d7e5df 0%, transparent 55%), linear-gradient(180deg, #eef3f0 0%, #f4f7f5 100%)',
          }}
        />

        <section
          id="about"
          className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10 md:py-32"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            transition={transition}
          >
            <p className="text-sm font-semibold tracking-[0.16em] text-cedar uppercase">
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

        <section className="relative border-y border-fog/70 bg-mist/45">
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
                <p className="text-xs font-semibold tracking-[0.18em] text-cedar uppercase">
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
          className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-10 md:py-32"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            transition={transition}
            className="mb-12 max-w-2xl"
          >
            <p className="text-sm font-semibold tracking-[0.16em] text-cedar uppercase">
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
                <span className="text-sm font-medium text-cedar">{project.year}</span>
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
          className="relative mx-auto w-full max-w-6xl px-6 pb-24 md:px-10 md:pb-32"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            transition={transition}
            className="relative overflow-hidden rounded-[2rem] px-8 py-14 text-paper md:px-14 md:py-16"
            style={{
              background:
                'linear-gradient(135deg, #0f1c1a 0%, #1e3831 55%, #2a4f45 100%)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-glow/25 blur-3xl"
            />
            <p className="text-sm font-semibold tracking-[0.16em] text-glow uppercase">
              Connect
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight md:text-5xl">
              Building something interesting? Let’s talk.
            </h2>
            <p className="mt-5 max-w-lg text-base text-mist/90">
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
                  className="rounded-full border border-paper/25 bg-paper/5 px-5 py-3 text-sm font-semibold text-paper transition hover:border-paper/50 hover:bg-paper/10"
                >
                  {social.label}
                  <span className="ml-2 font-normal text-mist/80">
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-fog px-6 py-10 text-sm text-ink-soft md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Simon Huang</p>
        <p>Designed to stay quiet. Deployed on Cloudflare Pages.</p>
      </footer>
    </div>
  )
}

export default App
