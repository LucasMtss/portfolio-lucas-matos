import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { RecentProjects } from '../components/RecentProjects'

export function HomePage() {
  return (
    <main>
      <Hero />
      <RecentProjects />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}
