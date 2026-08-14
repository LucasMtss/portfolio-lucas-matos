import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, GitFork, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  fetchRecentRepos,
  formatRepoDate,
  repoPreviewSources,
  type GithubRepo,
} from '../lib/github'
import { site } from '../data/site'
import { GithubIcon } from './icons'
import { PreviewImage } from './PreviewImage'
import { Reveal } from './Reveal'

export function RecentProjects() {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const reduced = useReducedMotion()

  useEffect(() => {
    let cancelled = false

    fetchRecentRepos(6)
      .then((data) => {
        if (!cancelled) {
          setRepos(data)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      id="recentes"
      className="relative scroll-mt-24 border-t border-line bg-surface-elevated py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-ink-subtle">
                GitHub · ao vivo
              </p>
              <h2 className="font-heading max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                Meus projetos mais recentes
              </h2>
              <p className="mt-4 max-w-xl text-base text-ink-muted md:text-lg">
                Repositórios atualizados recentemente em{' '}
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer font-medium text-accent underline-offset-2 hover:underline"
                >
                  @{site.username}
                </a>
                . Preview, linguagem e links diretos.
              </p>
            </div>
            <a
              href={`${site.social.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-full border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/25 hover:bg-surface sm:self-auto"
            >
              <GithubIcon size={16} aria-hidden />
              Ver todos ({site.stats.publicRepos})
            </a>
          </div>
        </Reveal>

        {status === 'loading' && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <div className="aspect-[16/10] bg-line" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 rounded bg-line" />
                  <div className="h-4 w-full rounded bg-line" />
                  <div className="h-4 w-1/2 rounded bg-line" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <p className="mt-12 text-center text-ink-muted">
            Não foi possível carregar os repositórios agora.{' '}
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer font-medium text-accent underline-offset-2 hover:underline"
            >
              Abrir GitHub
            </a>
          </p>
        )}

        {status === 'ready' && (
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {repos.map((repo, index) => (
              <motion.li
                key={repo.id}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6% 0px' }}
                transition={{
                  duration: 0.45,
                  delay: reduced ? 0 : Math.min(index * 0.06, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <RepoCard repo={repo} />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  const liveUrl = normalizeHomepage(repo.homepage)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-ink/20">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-line">
          <PreviewImage
            sources={repoPreviewSources(repo)}
            alt={`Preview do repositório ${repo.name}`}
            fallbackLabel={repo.name.replaceAll('_', ' ')}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="px-4 pt-4 md:px-5">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-ink-subtle">
            <time dateTime={repo.updated_at}>
              {formatRepoDate(repo.updated_at)}
            </time>
            {repo.language && (
              <>
                <span aria-hidden>·</span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent-deep">
                  {repo.language}
                </span>
              </>
            )}
          </div>
          <h3 className="font-heading text-lg font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
            {repo.name.replaceAll('_', ' ')}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-ink-muted">
            {repo.description ?? 'Sem descrição no GitHub.'}
          </p>
        </div>
      </a>

      <div className="mt-auto flex items-center justify-between gap-3 px-4 pb-4 pt-4 md:px-5">
        <div className="flex items-center gap-3 text-xs text-ink-subtle">
          <span className="inline-flex items-center gap-1">
            <Star size={13} aria-hidden />
            {repo.stargazers_count}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork size={13} aria-hidden />
            {repo.forks_count}
          </span>
        </div>
        <div className="flex gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-accent/10 px-2.5 py-1.5 text-xs font-semibold text-accent-deep transition-colors duration-200 hover:bg-accent hover:text-white"
            >
              <ExternalLink size={12} aria-hidden />
              Demo
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-ink transition-colors duration-200 hover:border-ink/30 hover:bg-surface-elevated"
          >
            <GithubIcon size={12} aria-hidden />
            Repo
          </a>
        </div>
      </div>
    </article>
  )
}

function normalizeHomepage(homepage: string | null) {
  if (!homepage) return null
  const trimmed = homepage.trim()
  if (!trimmed) return null
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return `https://${trimmed}`
}
