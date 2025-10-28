'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  GitMerge,
  Cpu,
  Workflow,
  FileCheck,
  Globe,
  ChevronDown
} from 'lucide-react'
import { Card, Button } from '@/components/ui'

const features = [
  {
    id: 'dashboard',
    icon: BarChart3,
    title: 'Real-time Security Dashboard',
    description: 'Unified view across all security tools with live updates',
    stat: '90% Faster',
    benefit: 'Threat detection',
    details: [
      'Live WebSocket updates for instant notifications',
      'Unified findings from 25+ security tools',
      'Intelligent deduplication and correlation',
      'Custom views and filters',
      'Multi-project dashboard',
    ],
  },
  {
    id: 'integration',
    icon: GitMerge,
    title: '25+ Integrated Security Tools',
    description: 'No vendor lock-in. Best-in-class tools, unified platform',
    stat: '25+ Tools',
    benefit: 'Integrated',
    details: [
      'Slither, Mythril, Aderyn, Semgrep (Solidity)',
      'Moccasin, Vyper-specific analyzers',
      'Sol-azy, Sec3 X-Ray (Rust/Solana)',
      'Cairo analyzers (Caracal)',
      'Continuous integration of new tools',
    ],
  },
  {
    id: 'intelligence',
    icon: Cpu,
    title: 'AI-Powered Intelligence',
    description: 'Machine learning reduces false positives and correlates findings',
    stat: '60%',
    benefit: 'Fewer duplicates',
    details: [
      'ML-powered false positive reduction',
      'Semantic analysis across contracts',
      'Intelligent finding correlation',
      'Auto-categorization by severity',
      'Continuous learning from your codebase',
    ],
  },
  {
    id: 'cicd',
    icon: Workflow,
    title: 'CI/CD Integration',
    description: 'Seamlessly integrate security into your development workflow',
    stat: '5 min',
    benefit: 'Setup time',
    details: [
      'GitHub Actions integration',
      'GitLab CI/CD pipelines',
      'Jenkins plugin support',
      'Pre-commit hooks',
      'Automated PR security checks',
    ],
  },
  {
    id: 'compliance',
    icon: FileCheck,
    title: 'Compliance Automation',
    description: 'Automated documentation for audits and regulatory requirements',
    stat: '60%',
    benefit: 'Faster time-to-audit',
    details: [
      'Automated audit report generation',
      'SOC2 compliance tracking',
      'Regulatory requirement mapping',
      'Historical vulnerability tracking',
      'Export to multiple formats',
    ],
  },
  {
    id: 'multichain',
    icon: Globe,
    title: 'Multi-Blockchain Support',
    description: 'Ethereum, Solana, Polygon, Arbitrum, Optimism, and more',
    stat: '4',
    benefit: 'Languages supported',
    details: [
      'Solidity (Ethereum/EVM chains)',
      'Rust (Solana)',
      'Vyper (Ethereum)',
      'Cairo (Starknet)',
    ],
  },
]

export function Features() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)

  const active = features.find((f) => f.id === activeFeature) || features[0]

  return (
    <section id="features" className="relative py-24 sm:py-32 bg-dark-400 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[120px]" />

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
              Platform Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
            Built for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-500 to-purple-500">
              Enterprise Blockchain Security Development Teams
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Everything you need to secure your Web3 projects, from development to production.
          </p>
        </motion.div>

        {/* Features Grid + Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Feature Tabs (Left) */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveFeature(feature.id)}
                className={`w-full text-left transition-all duration-300 ${
                  activeFeature === feature.id ? '' : ''
                }`}
              >
                <Card
                  variant="glass"
                  hover={false}
                  className={`p-6 transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'border-electric-500/50 bg-white/10 shadow-neon'
                      : 'border-white/10 hover:border-electric-500/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        activeFeature === feature.id
                          ? 'bg-gradient-to-br from-electric-500 to-purple-500 shadow-neon'
                          : 'bg-white/5'
                      }`}
                    >
                      <feature.icon
                        className={`w-6 h-6 ${
                          activeFeature === feature.id
                            ? 'text-white'
                            : 'text-white/60'
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-lg font-bold mb-1 transition-colors ${
                          activeFeature === feature.id
                            ? 'text-white'
                            : 'text-white/80'
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/60">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.button>
            ))}
          </div>

          {/* Feature Detail (Right) */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="glass" className="p-8 border-electric-500/20">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-500 to-purple-500 flex items-center justify-center mb-6 shadow-neon">
                    <active.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-4">{active.title}</h3>

                  {/* Stat */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <div className="text-4xl font-bold text-electric-500">
                      {active.stat}
                    </div>
                    <div className="text-lg text-white/60">{active.benefit}</div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-white/70 mb-6">
                    {active.description}
                  </p>

                  {/* Details List */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-3">
                      Key Capabilities
                    </h4>
                    {active.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-electric-500/20 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-electric-500" />
                        </div>
                        <p className="text-white/80">{detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a href="#pricing" className="inline-flex flex-col items-center gap-2 text-electric-500 hover:text-electric-400 transition-colors group cursor-pointer">
            <span className="text-lg font-semibold">Pricing</span>
            <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
