import { site } from '../data/site'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section
      id="sobre"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,#dbeafe_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[minmax(0,240px)_1fr] md:gap-16 md:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-5">
            <img
              src={site.avatar}
              alt={`Foto de ${site.name}`}
              width={220}
              height={220}
              className="aspect-square w-full max-w-[220px] rounded-3xl object-cover shadow-lg ring-1 ring-line"
            />
            <dl className="space-y-2 text-sm text-ink-muted">
              <div>
                <dt className="sr-only">Localização</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt className="sr-only">Empresa</dt>
                <dd className="font-medium text-ink">{site.company}</dd>
              </div>
              <div>
                <dt className="sr-only">GitHub</dt>
                <dd>
                  <a
                    href={site.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-accent underline-offset-2 hover:underline"
                  >
                    @{site.username} · {site.stats.publicRepos} repos ·{' '}
                    {site.stats.followers} followers
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-ink-subtle">
              Sobre
            </p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              {site.about.title}
            </h2>
          </Reveal>

          {site.about.paragraphs.map((p, i) => (
            <Reveal key={p.slice(0, 24)} delay={0.08 * (i + 1)}>
              <p className="text-base leading-relaxed text-ink-muted md:text-lg">
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.28}>
            <ul className="mt-4 flex flex-wrap gap-2">
              {site.about.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-line bg-surface-elevated px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
