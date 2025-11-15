'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'

const stats = [
  { value: '25+', label: 'Security Tools' },
  { value: '<5%', label: 'False Positives' },
  { value: '580+', label: 'Detectors' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-mesh animate-gradient bg-[length:600%_600%] overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-32 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <Badge variant="default" className="mb-4">
              ENTERPRISE SMART CONTRACT DEVSECOPS PLATFORM
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-hero font-bold font-display leading-tight"
          >
            Unified
            <br />
            <span className="gradient-text">
              DevSecOps
            </span>
            <br />
            for Web3
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
          >
            Cut security review time by 70% while catching more vulnerabilities across Solidity, Vyper, Rust, and Cairo. BlockSecOps unifies top industry-leading scanners with 580+ detectors, delivering actionable insights through real-time security dashboards, AI powered intelligence and native CI/CD integration. Reduce false positives by 95% and monitor your security posture from pre-commit to production.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <a href="#solution">
              <Button variant="primary" size="lg">
                Learn More
              </Button>
            </a>
            <a href="https://blocksecops.com/contact">
              <Button variant="secondary" size="lg">
                Request Demo
              </Button>
            </a>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto pt-12"
          >
            {stats.map((stat, index) => (
              <motion.div key={stat.label} variants={item}>
                <Card
                  variant="glass"
                  className="text-center hover:shadow-neon transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-electric-500 mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm md:text-base text-white/70">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 1,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
      >
        <a href="#solution" className="flex flex-col items-center gap-2 text-white/40 hover:text-electric-500 transition-colors">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </motion.div>
    </section>
  )
}
