import { ArrowUpRight, Mail, MessageCircle, Triangle } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { site } from '../data/site'
import { GithubIcon, LinkedinIcon } from './icons'
import { Reveal } from './Reveal'

type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number; className?: string }
>

export function Contact() {
  return (
    <section
      id="contato"
      className="relative scroll-mt-24 border-t border-line bg-ink py-20 text-surface md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 40% at 20% 80%, #2563eb55 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 90% 20%, #3f3f4655 0%, transparent 50%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-zinc-400">
            Contato
          </p>
          <h2 className="font-heading max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Vamos construir algo com movimento e intenção.
          </h2>
          <p className="mt-4 max-w-lg text-base text-zinc-400 md:text-lg">
            Aberto a freelas, produtos e colaborações. Escreva ou encontre-me
            nos canais abaixo.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex cursor-pointer items-center gap-3 font-heading text-2xl font-semibold text-white transition-colors duration-200 hover:text-accent-soft md:text-4xl"
          >
            {site.email}
            <ArrowUpRight
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <ul className="flex flex-wrap gap-3">
            <SocialLink href={`mailto:${site.email}`} label="E-mail" icon={Mail} />
            <SocialLink
              href={site.social.github}
              label="GitHub"
              icon={GithubIcon}
            />
            <SocialLink
              href={site.social.linkedin}
              label="LinkedIn"
              icon={LinkedinIcon}
            />
            <SocialLink
              href={site.social.whatsapp}
              label="WhatsApp"
              icon={MessageCircle}
            />
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string
  label: string
  icon: IconComponent
}) {
  return (
    <li>
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
      >
        <Icon size={16} aria-hidden />
        {label}
      </a>
    </li>
  )
}
