import { AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import { projects, type Project, type ProjectSource } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { Reveal } from './Reveal'

type Filter = 'all' | ProjectSource

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'github', label: 'GitHub' },
  { id: 'vercel', label: 'Vercel' },
  { id: 'both', label: 'Ambos' },
]

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    if (filter === 'both') return projects.filter((p) => p.source === 'both')
    return projects.filter(
      (p) => p.source === filter || p.source === 'both',
    )
  }, [filter])

  return (
    <section
      id="projetos"
      className="relative scroll-mt-24 border-t border-line bg-surface py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-ink-subtle">
            Destaques
          </p>
          <h2 className="font-heading max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Projetos selecionados
          </h2>
          <p className="mt-4 max-w-xl text-base text-ink-muted md:text-lg">
            Curadoria com preview, descrição e links para o código e a demo na
            Vercel.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filtrar projetos"
          >
            {filters.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`cursor-pointer shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'bg-ink text-surface'
                      : 'border border-line bg-surface-elevated text-ink-muted hover:border-ink/20 hover:text-ink'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-ink-muted">
            Nenhum projeto neste filtro. Adicione itens em{' '}
            <code className="rounded bg-line px-1.5 py-0.5 text-sm">
              src/data/projects.ts
            </code>
            .
          </p>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
