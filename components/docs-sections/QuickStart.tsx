'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { Terminal, Play, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Install the CLI',
    description: 'Get started by installing the BlockSecOps CLI tool',
    code: 'npm install -g @blocksecops/cli',
  },
  {
    number: '02',
    title: 'Authenticate',
    description: 'Connect to your BlockSecOps account',
    code: 'blocksecops login',
  },
  {
    number: '03',
    title: 'Scan Your Contract',
    description: 'Run your first security scan',
    code: 'blocksecops scan ./contracts/MyToken.sol',
  },
  {
    number: '04',
    title: 'View Results',
    description: 'Access your security report in the dashboard',
    code: 'blocksecops dashboard',
  },
]

export function QuickStart() {
  return (
    <section id="quick-start" className="py-24 bg-dark-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-electric-500">
              Quick Start Guide
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-6">
            Get Started in
            <br />
            <span className="gradient-text">
              Under 5 Minutes
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="p-8 h-full">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-electric-500 to-purple-500 flex items-center justify-center font-bold text-white">
                    {step.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-white/70 mb-4">{step.description}</p>

                    {/* Code Block */}
                    <div className="bg-black/40 rounded-lg p-4 font-mono text-sm border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-4 h-4 text-electric-500" />
                        <span className="text-white/60 text-xs">Terminal</span>
                      </div>
                      <code className="text-electric-400">{step.code}</code>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
