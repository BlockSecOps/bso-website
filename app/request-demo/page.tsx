import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DemoRequestForm } from '@/components/DemoRequestForm'

export const metadata = {
  title: 'Request a Demo',
  description: 'See BlockSecOps in action. Request a personalized demo to learn how our platform can enhance your blockchain security.',
}

export default function RequestDemoPage() {
  return (
    <main className="min-h-screen bg-dark-400">
      <Navigation />

      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-mesh animate-gradient bg-[length:600%_600%] opacity-20" />
        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
              Request a <span className="gradient-text">Demo</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              See how BlockSecOps can help secure your blockchain infrastructure.
              <br className="hidden sm:block" />
              Fill out the form below and our team will get in touch to schedule a personalized demo.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-dark-300/30 rounded-lg border border-white/5">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">Comprehensive Security</h3>
              <p className="text-sm text-white/60">See our full suite of security tools in action</p>
            </div>
            <div className="text-center p-6 bg-dark-300/30 rounded-lg border border-white/5">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-Time Monitoring</h3>
              <p className="text-sm text-white/60">Experience live threat detection and alerts</p>
            </div>
            <div className="text-center p-6 bg-dark-300/30 rounded-lg border border-white/5">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">Tailored Solutions</h3>
              <p className="text-sm text-white/60">Learn how we can customize for your needs</p>
            </div>
          </div>

          <DemoRequestForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
