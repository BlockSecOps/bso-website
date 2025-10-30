'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { Code2, Terminal, Puzzle } from 'lucide-react'

const platforms = [
  {
    icon: Code2,
    name: 'Solidity',
    description: 'Ethereum and EVM-compatible chains',
    tools: ['Slither', 'Mythril', 'Aderyn', 'Semgrep', 'Echidna', 'Certora'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Terminal,
    name: 'Rust (Solana)',
    description: 'Solana smart contract security',
    tools: ['Sol-azy', 'Sec3 X-Ray', 'Trident Fuzzer', 'cargo-fuzz'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Puzzle,
    name: 'Cairo',
    description: 'Starknet smart contracts',
    tools: ['Caracal', 'Starknet Foundry', 'Tayt'],
    color: 'from-green-500 to-emerald-500',
  },
]

const apiExamples = [
  {
    title: 'Scan a Contract',
    language: 'bash',
    code: `curl -X POST https://api.blocksecops.com/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contract": "MyToken.sol",
    "language": "solidity",
    "tools": ["slither", "mythril"]
  }'`,
  },
  {
    title: 'Get Scan Results',
    language: 'javascript',
    code: `const response = await fetch(
  'https://api.blocksecops.com/v1/scan/abc123',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
)
const results = await response.json()`,
  },
]

export function PlatformDocs() {
  return (
    <section id="platform-docs" className="py-24 bg-dark-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Multi-Language Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-electric-500">
                Platform Documentation
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              Multi-Language
              <br />
              <span className="gradient-text">
                Support
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" className="p-6 h-full hover:border-electric-500/40">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4`}>
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{platform.description}</p>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                      Integrated Tools
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {platform.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/70"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              API
              <br />
              <span className="gradient-text">
                Examples
              </span>
            </h2>
            <p className="text-xl text-white/60">
              Integrate BlockSecOps into your existing workflow
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {apiExamples.map((example, index) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{example.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-md bg-electric-500/20 text-electric-500 border border-electric-500/30">
                      {example.language}
                    </span>
                  </div>

                  <div className="bg-black/60 rounded-lg p-4 overflow-x-auto border border-white/10">
                    <pre className="text-sm font-mono">
                      <code className="text-electric-400">{example.code}</code>
                    </pre>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
