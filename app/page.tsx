import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Hero, Problem, Solution, Features, Detectors, Ecosystems, Stats, Pricing } from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <Hero />
      <Solution />
      <Features />
      <Pricing />
      <Detectors />
      <Ecosystems />
      <Stats />
      <Problem />

      <Footer />
    </main>
  )
}
