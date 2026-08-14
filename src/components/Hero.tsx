import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { site } from '../data/site'
import { GithubIcon, LinkedinIcon } from './icons'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : 0.12 + i * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  }

  const nameParts = site.name.split(' ')

  return (
    <section
      id="topo"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-24 md:pt-32"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y: yBg }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,#dbeafe_0%,transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_20%,#e4e4e7_0%,transparent_50%),linear-gradient(180deg,#fafafa_0%,#f4f4f5_100%)]" />
        <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl md:h-96 md:w-96" />
        <div className="absolute bottom-20 right-0 h-72 w-72 rounded-full bg-ink/5 blur-3xl md:h-[28rem] md:w-[28rem]" />
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-multiply"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.45\'/%3E%3C/svg%3E")',
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[18%] -z-10 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block"
        style={{ y: yMid }}
        aria-hidden
      />

      <motion.div
        className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8"
        style={{ opacity }}
      >
        <motion.div
          className="mb-6 flex flex-wrap items-center gap-4 md:mb-8"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={site.avatar}
            alt={`Foto de perfil de ${site.name}`}
            width={72}
            height={72}
            className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-line md:h-[72px] md:w-[72px]"
          />
          <div>
            <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-ink-subtle">
              {site.role}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} aria-hidden />
                {site.location}
              </span>
              <span aria-hidden className="hidden text-line sm:inline">
                ·
              </span>
              <span>{site.company}</span>
            </p>
          </div>
        </motion.div>

        <h1 className="font-heading text-[clamp(2.75rem,12vw,6.5rem)] font-semibold leading-[0.92] tracking-tight text-ink">
          {nameParts.map((part, i) => (
            <motion.span
              key={`${part}-${i}`}
              className="mr-[0.2em] inline-block last:mr-0"
              custom={i}
              variants={wordVariants}
              initial={reduced ? false : 'hidden'}
              animate="show"
            >
              {part}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:mt-8 md:text-lg"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.tagline}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#recentes"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
          >
            Projetos recentes
          </a>
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface-elevated/80 px-5 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/20 hover:bg-white"
          >
            <GithubIcon size={18} aria-hidden />
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface-elevated/80 px-5 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/20 hover:bg-white"
          >
            <LinkedinIcon size={18} aria-hidden />
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      <a
        href="#recentes"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 cursor-pointer items-center gap-2 text-xs font-medium uppercase tracking-widest text-ink-subtle transition-colors duration-200 hover:text-ink md:flex"
      >
        Scroll
        <ArrowDown size={14} aria-hidden />
      </a>
    </section>
  )
}
