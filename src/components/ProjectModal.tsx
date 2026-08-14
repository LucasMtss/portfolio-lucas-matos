import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Project } from '../data/projects'
import { GithubIcon } from './icons'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-ink/50 backdrop-blur-sm"
            aria-label="Fechar detalhes do projeto"
            onClick={onClose}
          />

          <motion.article
            className="relative z-10 flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface-elevated shadow-2xl sm:rounded-3xl"
            initial={reduced ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-line">
              <img
                src={project.image}
                alt={`Preview de ${project.title}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 inline-flex cursor-pointer items-center justify-center rounded-full bg-surface-elevated/90 p-2 text-ink shadow-sm transition-colors duration-200 hover:bg-white"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-subtle">
                <span>{project.year}</span>
                <span aria-hidden>·</span>
                <SourceBadge source={project.source} />
              </div>

              <h3
                id="project-modal-title"
                className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                {project.title}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                {project.longDescription ?? project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
                  >
                    <ExternalLink size={16} aria-hidden />
                    Demo / Vercel
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/25"
                  >
                    <GithubIcon size={16} aria-hidden />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SourceBadge({ source }: { source: Project['source'] }) {
  const label =
    source === 'both' ? 'GitHub · Vercel' : source === 'github' ? 'GitHub' : 'Vercel'
  return (
    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-accent-deep normal-case tracking-normal">
      {label}
    </span>
  )
}
