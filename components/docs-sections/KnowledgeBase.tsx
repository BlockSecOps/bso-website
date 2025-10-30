'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { Book, Shield, GitBranch, Workflow, Database, Settings } from 'lucide-react'

const categories = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'Learn the basics of BlockSecOps platform',
    articles: [
      'Introduction to BlockSecOps',
      'System Requirements',
      'Installation Guide',
      'First Security Scan',
      'Understanding Results',
    ],
    count: 12,
  },
  {
    icon: Shield,
    title: 'Security Tools',
    description: 'Deep dive into integrated security scanners',
    articles: [
      'Slither Integration',
      'Mythril Configuration',
      'Aderyn Setup',
      'Semgrep Rules',
      'Custom Tool Integration',
    ],
    count: 25,
  },
  {
    icon: GitBranch,
    title: 'CI/CD Integration',
    description: 'Automate security in your pipeline',
    articles: [
      'GitHub Actions Setup',
      'GitLab CI/CD',
      'Jenkins Plugin',
      'Pre-commit Hooks',
      'Automated Reports',
    ],
    count: 18,
  },
  {
    icon: Workflow,
    title: 'Workflows',
    description: 'Optimize your security workflow',
    articles: [
      'Team Collaboration',
      'Review Process',
      'Findings Management',
      'False Positive Handling',
      'Best Practices',
    ],
    count: 15,
  },
  {
    icon: Database,
    title: 'API Reference',
    description: 'Complete API documentation',
    articles: [
      'Authentication',
      'REST API Endpoints',
      'WebSocket Events',
      'SDK Reference',
      'Rate Limits',
    ],
    count: 30,
  },
  {
    icon: Settings,
    title: 'Configuration',
    description: 'Customize BlockSecOps for your needs',
    articles: [
      'Project Settings',
      'Tool Configuration',
      'Notification Setup',
      'Custom Rules',
      'Environment Variables',
    ],
    count: 20,
  },
]

export function KnowledgeBase() {
  return (
    <section id="knowledge-base" className="py-24 bg-gradient-to-b from-dark-400 to-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-electric-500">
              Knowledge Base
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-6">
            Browse by
            <br />
            <span className="gradient-text">
              Category
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Comprehensive guides and tutorials for every aspect of the platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant="glass"
                className="p-6 h-full cursor-pointer hover:border-electric-500/40 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-500 to-purple-500 flex items-center justify-center mb-4">
                  <category.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title & Count */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <span className="text-sm text-white/60">{category.count} articles</span>
                </div>

                {/* Description */}
                <p className="text-white/70 mb-4">{category.description}</p>

                {/* Article List */}
                <ul className="space-y-2">
                  {category.articles.map((article) => (
                    <li key={article} className="flex items-start gap-2 text-sm text-white/60 hover:text-electric-500 transition-colors">
                      <span className="text-electric-500 mt-1">→</span>
                      <span>{article}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
