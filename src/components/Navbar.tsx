import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site'

const homeLinks = [
  { href: '/#recentes', label: 'Recentes' },
  { href: '/#projetos', label: 'Destaques' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#contato', label: 'Contato' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const navLinks = [
    ...homeLinks,
    { href: '/blog', label: 'Blog', isRoute: true },
  ]

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 lg:px-8">
      <nav
        className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-300 md:px-5 ${
          scrolled || open || !isHome
            ? 'border-line bg-surface-elevated/90 shadow-[0_8px_30px_rgba(9,9,11,0.06)] backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
        aria-label="Principal"
      >
        <Link
          to="/"
          className="font-heading text-lg font-semibold tracking-tight text-ink transition-colors duration-200 hover:text-accent"
        >
          {site.shortName}
        </Link>

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              {'isRoute' in link && link.isRoute ? (
                <Link
                  to={link.href}
                  className={`font-body text-sm font-medium transition-colors duration-200 ${
                    location.pathname.startsWith('/blog')
                      ? 'text-ink'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="font-body text-sm font-medium text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
          <li>
            <a
              href={isHome ? '#contato' : '/#contato'}
              className="inline-flex cursor-pointer items-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-surface transition-colors duration-200 hover:bg-accent"
            >
              Fale comigo
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2 text-ink transition-colors duration-200 hover:bg-line/60 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="pointer-events-auto mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-line bg-surface-elevated/95 shadow-lg backdrop-blur-md md:hidden"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ul className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {'isRoute' in link && link.isRoute ? (
                    <Link
                      to={link.href}
                      className="block cursor-pointer rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors duration-200 hover:bg-accent-soft"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="block cursor-pointer rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors duration-200 hover:bg-accent-soft"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
              <li>
                <a
                  href={isHome ? '#contato' : '/#contato'}
                  className="mt-1 block cursor-pointer rounded-xl bg-ink px-4 py-3 text-center text-base font-medium text-surface transition-colors duration-200 hover:bg-accent"
                >
                  Fale comigo
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
