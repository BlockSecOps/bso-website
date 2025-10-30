import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the BlockSecOps team. We\'re here to help with your Web3 security needs.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-dark-400">
      <Navigation />

      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-mesh animate-gradient bg-[length:600%_600%] opacity-20" />
        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Have questions about our platform? Want to schedule a demo?
              <br className="hidden sm:block" />
              We'd love to hear from you.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
