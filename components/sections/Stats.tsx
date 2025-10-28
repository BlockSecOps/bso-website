'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 50, suffix: '%', label: 'Faster Security Reviews' },
  { value: 90, suffix: '%', label: 'Fewer Manual Correlations' },
  { value: 60, suffix: '%', label: 'Faster Time-to-Audit' },
  { value: 40, suffix: '%', label: 'Lower Tooling Costs' },
]

function CountUp({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = end / (duration * 60)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 1000 / 60)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <div ref={ref} className="text-5xl sm:text-6xl md:text-7xl font-bold text-electric-500">
      {count}
      {suffix}
    </div>
  )
}

export function Stats() {
  return (
    <section id="stats" className="relative py-24 sm:py-32 bg-gradient-to-b from-dark-400 to-dark-300 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-electric-500/20 rounded-full filter blur-[120px]" />

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
            <span className="text-sm font-semibold uppercase tracking-wider text-electric-500">
              Proven Results
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
            Security That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-500 to-purple-500">
              Delivers Results
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Real metrics from enterprise teams using BlockSecOps in production.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-8 text-center hover:shadow-neon transition-all duration-300"
            >
              <CountUp end={stat.value} suffix={stat.suffix} />
              <p className="mt-4 text-lg text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          <div>
            <div className="text-2xl font-bold text-white mb-1">&lt;5%</div>
            <p className="text-sm text-white/60">False Positive Rate</p>
          </div>
          <div className="hidden sm:block w-px bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white mb-1">25+</div>
            <p className="text-sm text-white/60">Tools Integrated</p>
          </div>
          <div className="hidden sm:block w-px bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white mb-1">4</div>
            <p className="text-sm text-white/60">Languages Supported</p>
          </div>
          <div className="hidden sm:block w-px bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white mb-1">99.9%</div>
            <p className="text-sm text-white/60">Uptime SLA</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
