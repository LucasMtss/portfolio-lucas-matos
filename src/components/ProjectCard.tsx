import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { Project } from '../data/projects'
import { GithubIcon } from './icons'

type ProjectCardProps = {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.4,
        delay: reduced ? 0 : Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-elevated transition-colors duration-300 hover:border-ink/20"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="cursor-pointer text-left"
        aria-label={`Abrir detalhes de ${project.title}`}
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-line">
          <img
            src={project.image}
            alt={`Preview de ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
              {project.year}
            </span>
            <SourceChip source={project.source} />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent md:text-xl">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-ink-subtle"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </button>

      <div className="mt-auto flex gap-2 border-t border-line px-4 py-3 md:px-5">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-accent/10 px-3 py-2 text-xs font-semibold text-accent-deep transition-colors duration-200 hover:bg-accent hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} aria-hidden />
            Demo
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-ink transition-colors duration-200 hover:border-ink/30 hover:bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <GithubIcon size={14} aria-hidden />
            Código
          </a>
        )}
      </div>
    </motion.article>
  )
}

function SourceChip({ source }: { source: Project['source'] }) {
  const label =
    source === 'both' ? 'GH · Vercel' : source === 'github' ? 'GitHub' : 'Vercel'
  return (
    <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
      {label}
    </span>
  )
}
