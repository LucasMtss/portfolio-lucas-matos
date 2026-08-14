import { site } from '../data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-ink px-4 py-8 text-zinc-500 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm">
          © {year} {site.name}. {site.location}.
        </p>
        <a
          href="#topo"
          className="cursor-pointer text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
        >
          Voltar ao topo
        </a>
      </div>
    </footer>
  )
}
