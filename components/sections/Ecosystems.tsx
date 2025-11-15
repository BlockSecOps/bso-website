'use client'

import { motion } from 'framer-motion'
import { Code2, FileCode, Boxes, Pyramid } from 'lucide-react'
import { Card, Badge } from '@/components/ui'

const ecosystems = [
  {
    icon: Code2,
    language: 'Solidity',
    description: 'EVM-compatible blockchain ecosystems',
    color: 'from-blue-500 to-cyan-500',
    chains: [
      'Ethereum',
      'BNB Chain',
      'Polygon',
      'Avalanche',
      'Arbitrum',
      'Optimism',
      'Base',
      'zkSync Era',
      'Linea',
      'Scroll',
      'Mantle',
      'Metis',
      'Fantom',
      'Celo',
      'Gnosis Chain',
      'Cronos',
      'Harmony',
    ],
  },
  {
    icon: Boxes,
    language: 'Rust',
    description: 'High-performance blockchain platforms',
    color: 'from-green-500 to-emerald-500',
    chains: [
      'Solana',
      'Polkadot',
      'Kusama',
      'Near',
      'Cosmos Hub',
      'Osmosis',
      'Juno',
      'Secret Network',
      'Terra Classic',
      'Aptos',
      'Sui',
    ],
  },
  {
    icon: FileCode,
    language: 'Vyper',
    description: 'Pythonic smart contract platforms',
    color: 'from-purple-500 to-pink-500',
    chains: [
      'Ethereum',
      'Arbitrum',
      'Optimism',
      'Base',
      'zkSync Era',
      'Linea',
      'Scroll',
    ],
  },
  {
    icon: Pyramid,
    language: 'Cairo',
    description: 'StarkWare-powered ecosystems',
    color: 'from-orange-500 to-red-500',
    chains: [
      'StarkNet',
      'StarkEx',
    ],
  },
]

export function Ecosystems() {
  return (
    <section id="ecosystems" className="py-24 bg-dark-200">
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
            Supported <span className="text-electric-500">Blockchain Ecosystems</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            By scanning Solidity, Rust, Vyper, and Cairo, BlockSecOps provides comprehensive security and protection across 30+ blockchain ecosystems
          </p>
        </motion.div>

        {/* Ecosystems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ecosystems.map((ecosystem, index) => (
            <motion.div
              key={ecosystem.language}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-neon transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${ecosystem.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <ecosystem.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{ecosystem.language}</h3>
                    <p className="text-white/60">{ecosystem.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ecosystem.chains.map((chain) => (
                    <Badge key={chain} variant="default" className="text-xs">
                      {chain}
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
                <div className="text-4xl font-bold text-electric-500 mb-2">37+</div>
                <p className="text-white/60">Blockchain Ecosystems</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/10" />
              <div>
                <div className="text-4xl font-bold text-purple-500 mb-2">4</div>
                <p className="text-white/60">Languages Supported</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/10" />
              <div>
                <div className="text-4xl font-bold text-electric-500 mb-2">100%</div>
                <p className="text-white/60">Coverage Guaranteed</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
