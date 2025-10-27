import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Hero, Problem, Solution, Features, Detectors, Stats, Pricing } from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <Hero />
      <Solution />
      <Features />
      <Pricing />
      <Detectors />
      <Stats />
      <Problem />

      <Footer />
    </main>
  )
}
