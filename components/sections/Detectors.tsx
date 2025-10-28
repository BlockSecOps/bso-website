'use client'

import { motion } from 'framer-motion'
import { Code2, FileCode, Boxes, Pyramid } from 'lucide-react'
import { Card, Badge } from '@/components/ui'

const detectors = [
  {
    icon: Code2,
    language: 'Solidity',
    count: '371',
    description: 'Most comprehensive Solidity analysis available',
    tools: ['Slither', 'Aderyn', '4naly3er', 'Semgrep', 'Solhint', 'Certora'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileCode,
    language: 'Vyper',
    count: '99',
    description: 'Deep Vyper smart contract security analysis',
    tools: ['Slither-Vyper'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Boxes,
    language: 'Solana/Rust',
    count: '25+',
    description: 'Specialized Solana program security scanning',
    tools: ['Sol-azy', 'Sec3 X-Ray'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Pyramid,
    language: 'Cairo',
    count: '14',
    description: 'StarkNet Cairo contract analysis',
    tools: ['Caracal'],
    color: 'from-orange-500 to-red-500',
  },
]

export function Detectors() {
  return (
    <section id="detectors" className="py-24 bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-6">
            Detector & Scanner <span className="text-electric-500">Coverage</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            500+ total detectors across 4 blockchain languages with industry-leading security tool integration
          </p>
        </motion.div>

        {/* Detectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detectors.map((detector, index) => (
            <motion.div
              key={detector.language}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-neon transition-all duration-300">
                <div className={`mb-6 w-16 h-16 bg-gradient-to-br ${detector.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <detector.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{detector.language}</h3>
                <div className="text-3xl font-bold text-electric-500 mb-4">{detector.count}</div>
                <p className="text-white/60 mb-6">{detector.description}</p>
                <div className="flex flex-wrap gap-2">
                  {detector.tools.map((tool) => (
                    <Badge key={tool} variant="default" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Card variant="glass" className="inline-block px-12 py-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div>
                <div className="text-4xl font-bold text-electric-500 mb-2">500+</div>
                <p className="text-white/60">Total Detectors</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/10" />
              <div>
                <div className="text-4xl font-bold text-purple-500 mb-2">4</div>
                <p className="text-white/60">Languages Supported</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/10" />
              <div>
                <div className="text-4xl font-bold text-electric-500 mb-2">10+</div>
                <p className="text-white/60">Security Tools</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
