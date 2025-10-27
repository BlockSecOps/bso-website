'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock, DollarSign, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui'

const problems = [
  {
    icon: AlertTriangle,
    title: '7+ Fragmented Tools',
    description: 'Enterprise teams juggle multiple security scanners with no unified view—leading to missed vulnerabilities and wasted time.',
  },
  {
    icon: Clock,
    title: '3.5 Hours per Review',
    description: 'Developers spend hours manually correlating findings across different tools instead of writing secure code.',
  },
  {
    icon: DollarSign,
    title: '$100K-500K Annually',
    description: 'Companies waste hundreds of thousands on disconnected security tooling that doesn\'t integrate.',
  },
  {
    icon: AlertCircle,
    title: '73% False Positive Rate',
    description: 'Industry-average false positives create alert fatigue, causing teams to ignore real vulnerabilities.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32 bg-gradient-to-b from-dark-400 via-dark-300 to-dark-400 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-error/20 rounded-full filter blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-error">
              The Crisis
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
            <span className="text-error">$2.36 Billion</span> Lost to
            <br />
            Smart Contract Hacks in 2024
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            760 incidents. 90% of exploited projects had no security audit.
            <br />
            Your fragmented security tools aren't working.
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {problems.map((problem, index) => (
            <motion.div key={problem.title} variants={item}>
              <Card
                variant="glass"
                className="h-full border-error/20 hover:border-error/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-error/20 flex items-center justify-center">
                    <problem.icon className="w-6 h-6 sm:w-7 sm:h-7 text-error" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                      {problem.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-white/50">
            There has to be a better way... and there is.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
