'use client'

import { motion } from 'framer-motion'
import { Layers, Shield, Zap, ChevronDown } from 'lucide-react'
import { Card, Button } from '@/components/ui'

const solutions = [
  {
    icon: Layers,
    title: 'Unified Intelligence',
    stat: 'Deduplicated Findings',
    description: 'Our AI-powered engine aggregates findings from 25+ security tools, eliminates 60% of duplicates, and correlates vulnerabilities across your entire codebase.',
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    stat: '<5% False Positives',
    description: 'Advanced filtering reduces false positives from industry average of 73% to under 5%—saving your developers from alert fatigue and wasted hours.',
  },
  {
    icon: Zap,
    title: 'Multi-Language Support',
    stat: '6 Languages',
    description: 'One platform for Solidity, Rust, Vyper, Move, Cairo, and more. No need to juggle different tools for different blockchains.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export function Solution() {
  return (
    <section id="solution" className="relative py-24 sm:py-32 bg-gradient-to-b from-dark-400 via-dark-300 to-dark-400 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric-500/20 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[120px]" />

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
              The Solution
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
            One Dashboard.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-500 to-purple-500">
              Complete Visibility.
            </span>
            <br />
            Total Control.
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            BlockSecOps delivers what CertiK, ConsenSys, and fragmented tools can't: a unified,
            multi-vendor security operations platform built for enterprise teams.
          </p>
        </motion.div>

        {/* Solution Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {solutions.map((solution, index) => (
            <motion.div key={solution.title} variants={item}>
              <Card
                variant="glass"
                className="h-full text-center border-electric-500/20 hover:border-electric-500/40 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-500 to-purple-500 flex items-center justify-center group-hover:shadow-neon transition-all duration-300">
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {solution.title}
                </h3>

                {/* Stat */}
                <div className="text-3xl font-bold text-electric-500 mb-4">
                  {solution.stat}
                </div>

                {/* Description */}
                <p className="text-white/70 leading-relaxed">
                  {solution.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <a href="#features" className="inline-flex flex-col items-center gap-2 text-electric-500 hover:text-electric-400 transition-colors group cursor-pointer">
            <span className="text-lg font-semibold">Platform Features</span>
            <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
