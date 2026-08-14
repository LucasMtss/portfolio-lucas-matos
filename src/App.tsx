import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { RecentProjects } from './components/RecentProjects'

export default function App() {
  return (
    <>
      <a
        href="#recentes"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para projetos
      </a>
      <Navbar />
      <main>
        <Hero />
        <RecentProjects />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
