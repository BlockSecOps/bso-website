'use client'

import { motion } from 'framer-motion'
import { Search, Book, Code, Zap } from 'lucide-react'
import { Badge, Input } from '@/components/ui'
import { useState } from 'react'

const quickLinks = [
  { icon: Book, label: 'Getting Started', href: '#getting-started' },
  { icon: Code, label: 'API Reference', href: '#api-reference' },
  { icon: Zap, label: 'Quick Start', href: '#quick-start' },
]

export function DocsHero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative pt-32 pb-20 bg-gradient-mesh animate-gradient bg-[length:600%_600%] overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="default" className="mb-6">
            Platform Documentation
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
            BlockSecOps
            <br />
            <span className="gradient-text">
              Documentation
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Everything you need to integrate and use BlockSecOps for enterprise-grade Web3 security.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all duration-300 hover:shadow-neon"
              >
                <link.icon className="w-5 h-5 text-electric-500" />
                <span className="text-white">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
