'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Shield, Zap, Users, Crown } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import Link from 'next/link'

// Pricing tier data
const pricingTiers = [
  {
    id: 'developer',
    name: 'Developer',
    icon: Zap,
    price: '$3,500',
    priceMonthly: '$292',
    period: '/year',
    description: 'Perfect for indie developers and small teams',
    color: 'blue',
    popular: false,
    features: [
      '3 active mainnet projects (unlimited testnet)',
      '2 developer seats',
      'All supported chains (Ethereum, Solana, StarkNet, Avalanche+)',
      'Unlimited automated CI/CD scans',
      'GitHub Actions & GitLab CI integration',
      'Basic vulnerability dashboard',
      'Email support (48-hour response)',
      '1,000 API calls/month',
    ],
    bestFor: 'Solo developers, 2-3 person teams, open-source projects',
    additionalSeats: '$100/seat/month',
    ctaPrimary: 'Schedule Demo',
    ctaPrimaryLink: '/request-demo',
  },
  {
    id: 'startup',
    name: 'Startup',
    icon: Users,
    price: '$12,000',
    priceMonthly: '$1,000',
    period: '/year',
    description: 'Everything growing teams need to ship securely',
    color: 'green',
    popular: false,
    features: [
      'Unlimited testnet + 10 mainnet projects',
      '5 developer seats included',
      'All supported chains',
      'Unlimited automated scans',
      'GitHub Actions, GitLab CI, Jenkins, CircleCI',
      'Standard vulnerability tracking & reporting',
      'Email + Slack community support (24-hour response)',
      'Basic security analytics',
      '10,000 API calls/month',
    ],
    bestFor: 'Seed to Series A startups (5-15 developers), development agencies',
    additionalSeats: '$100/seat/month',
    ctaPrimary: 'Schedule Demo',
    ctaPrimaryLink: '/request-demo',
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Shield,
    price: '$50,000',
    priceMonthly: '$4,167',
    period: '/year',
    description: 'Enterprise-grade continuous security for serious protocols',
    color: 'purple',
    popular: true,
    features: [
      'Unlimited projects (testnet and mainnet)',
      '20 developer seats included',
      'All supported chains + priority for new chains',
      'Unlimited automated scans with advanced detection',
      'All CI/CD tools + JIRA, Slack, MS Teams integrations',
      'Automated fix suggestions',
      'Advanced analytics, custom reports, trend analysis',
      'SSO/SAML/OIDC single sign-on',
      'Priority support (4-hour response, 1-hour critical)',
      'Basic compliance audit reports',
      '100,000 API calls/month',
    ],
    bestFor: 'Series A-B companies (15-50 developers), DeFi protocols with $10M-$500M TVL',
    additionalSeats: '$150/seat/month',
    ctaPrimary: 'Schedule Demo',
    ctaPrimaryLink: '/request-demo',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Crown,
    price: '$150,000',
    priceMonthly: '$12,500',
    period: '/year',
    description: 'Mission-critical security with white-glove service',
    color: 'indigo',
    popular: false,
    features: [
      'Everything in Professional, plus:',
      '50 developer seats included',
      'Dedicated Customer Success Manager',
      'Custom SLA (1-hour response, 15-minute critical)',
      'On-premise or private cloud deployment',
      'Custom integrations and API development',
      'Advanced RBAC, audit logging, compliance reports',
      'Executive dashboards & quarterly business reviews',
      'Team onboarding, security training, certification',
      'Early access to new features',
      'SOC 2, ISO 27001 alignment documentation',
      'Priority bug fixes',
    ],
    bestFor: 'Series B+ companies (50-200 developers), major DeFi protocols ($500M+ TVL), Fortune 1000 enterprises',
    additionalSeats: '$200/seat/month',
    ctaPrimary: 'Schedule Demo',
    ctaPrimaryLink: '/request-demo',
  },
  {
    id: 'enterprise-plus',
    name: 'Enterprise Plus',
    icon: Crown,
    price: 'Custom',
    priceMonthly: 'Starting at $25,000',
    period: 'pricing',
    description: 'Strategic security partnership for blockchain leaders',
    color: 'amber',
    popular: false,
    features: [
      'Everything in Enterprise, plus:',
      'Unlimited developer seats',
      '24/7/365 white-glove support',
      'Financial SLA guarantees (<15min response critical, 99.9% uptime)',
      '2-3 dedicated security engineers',
      'Co-development of custom detection rules',
      'On-call incident response team',
      'Full audit support & regulatory consulting',
      'Annual security summit & executive briefings',
      'Product roadmap input & early alpha access',
      'Liability coverage options',
    ],
    bestFor: 'Major DeFi protocols ($1B+ TVL), Layer 1 blockchains, Fortune 500 enterprises, government/defense',
    additionalSeats: 'Unlimited',
    ctaPrimary: 'Schedule Demo',
    ctaPrimaryLink: '/request-demo',
  },
]

// Feature comparison data
const comparisonFeatures = [
  { category: 'Projects & Seats', features: [
    { name: 'Mainnet Projects', developer: '3', startup: '10', professional: 'Unlimited', enterprise: 'Unlimited', enterprisePlus: 'Unlimited' },
    { name: 'Testnet Projects', developer: 'Unlimited', startup: 'Unlimited', professional: 'Unlimited', enterprise: 'Unlimited', enterprisePlus: 'Unlimited' },
    { name: 'Developer Seats', developer: '2', startup: '5', professional: '20', enterprise: '50', enterprisePlus: 'Unlimited' },
    { name: 'Additional Seats', developer: '$100/mo', startup: '$100/mo', professional: '$150/mo', enterprise: '$200/mo', enterprisePlus: 'Included' },
  ]},
  { category: 'Platform Features', features: [
    { name: 'Supported Chains', developer: 'All', startup: 'All', professional: 'All + Priority', enterprise: 'All + Priority', enterprisePlus: 'All + Priority' },
    { name: 'CI/CD Integration', developer: 'Basic', startup: 'Standard', professional: 'Advanced', enterprise: 'Custom', enterprisePlus: 'Custom' },
    { name: 'SSO/SAML', developer: false, startup: false, professional: true, enterprise: true, enterprisePlus: true },
    { name: 'Automated Fix Suggestions', developer: false, startup: false, professional: true, enterprise: true, enterprisePlus: true },
    { name: 'API Calls/Month', developer: '1,000', startup: '10,000', professional: '100,000', enterprise: 'Unlimited', enterprisePlus: 'Unlimited' },
  ]},
  { category: 'Support & Services', features: [
    { name: 'Support SLA', developer: '48hr email', startup: '24hr email', professional: '4hr priority', enterprise: '1hr custom', enterprisePlus: '15min white-glove' },
    { name: 'Customer Success Manager', developer: false, startup: false, professional: false, enterprise: true, enterprisePlus: true },
    { name: 'Dedicated Security Engineers', developer: false, startup: false, professional: false, enterprise: false, enterprisePlus: '2-3 engineers' },
    { name: 'On-premise Deployment', developer: false, startup: false, professional: false, enterprise: true, enterprisePlus: true },
  ]},
  { category: 'Advanced Features', features: [
    { name: 'Custom Integrations', developer: false, startup: false, professional: 'Limited', enterprise: true, enterprisePlus: true },
    { name: 'Compliance Reports', developer: false, startup: false, professional: 'Basic', enterprise: 'Advanced', enterprisePlus: 'Full Audit Support' },
    { name: 'Incident Response Team', developer: false, startup: false, professional: false, enterprise: false, enterprisePlus: true },
  ]},
]

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>('professional')
  const [showAnnual, setShowAnnual] = useState(true)

  const getColorClasses = (color: string, variant: 'border' | 'bg' | 'text' | 'shadow') => {
    const colors: Record<string, Record<string, string>> = {
      blue: {
        border: 'border-blue-500/50',
        bg: 'bg-blue-500/20',
        text: 'text-blue-500',
        shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      },
      green: {
        border: 'border-green-500/50',
        bg: 'bg-green-500/20',
        text: 'text-green-500',
        shadow: 'shadow-[0_0_30px_rgba(34,197,94,0.3)]',
      },
      purple: {
        border: 'border-electric-500/50',
        bg: 'bg-electric-500/20',
        text: 'text-electric-500',
        shadow: 'shadow-neon',
      },
      indigo: {
        border: 'border-indigo-500/50',
        bg: 'bg-indigo-500/20',
        text: 'text-indigo-500',
        shadow: 'shadow-[0_0_30px_rgba(99,102,241,0.3)]',
      },
      amber: {
        border: 'border-amber-500/50',
        bg: 'bg-amber-500/20',
        text: 'text-amber-500',
        shadow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]',
      },
    }
    return colors[color]?.[variant] || ''
  }

  return (
    <main className="min-h-screen bg-dark-400">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-500/20 rounded-full filter blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-electric-500">
                Transparent Pricing
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-display mb-6">
              Security That Scales
              <br />
              <span className="gradient-text">
                With Your Growth
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
              From indie developers to Fortune 500 enterprises, choose the plan that fits your team and security needs.
            </p>

            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className={`text-sm ${!showAnnual ? 'text-white/40' : 'text-white/80'}`}>Annual</span>
              <button
                onClick={() => setShowAnnual(!showAnnual)}
                className="relative w-14 h-7 bg-white/10 rounded-full transition-colors hover:bg-white/20"
              >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-electric-500 rounded-full transition-transform ${!showAnnual ? 'translate-x-7' : ''}`} />
              </button>
              <span className={`text-sm ${showAnnual ? 'text-white/40' : 'text-white/80'}`}>Monthly</span>
            </div>
            <p className="text-sm text-electric-500">Save up to 20% with multi-year commitments</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="relative py-16 bg-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pricingTiers.map((tier, index) => {
              const Icon = tier.icon
              const isSelected = selectedTier === tier.id

              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative ${tier.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
                >
                  <div
                    onClick={() => setSelectedTier(tier.id)}
                    className={`glass rounded-2xl p-6 h-full flex flex-col transition-all duration-300 cursor-pointer ${
                      tier.popular
                        ? `${getColorClasses(tier.color, 'border')} ${getColorClasses(tier.color, 'shadow')} scale-105`
                        : isSelected
                        ? `${getColorClasses(tier.color, 'border')} ${getColorClasses(tier.color, 'shadow')}`
                        : 'border-white/10 hover:border-electric-500/30'
                    }`}
                  >
                    {/* Popular Badge */}
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge variant="default" className="bg-electric-500 text-white border-0">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg ${getColorClasses(tier.color, 'bg')} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${getColorClasses(tier.color, 'text')}`} />
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="text-4xl font-bold">{tier.price}</div>
                      <div className="text-white/60 text-sm">
                        {showAnnual ? tier.period : `${tier.priceMonthly}/month`}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 text-sm mb-6">{tier.description}</p>

                    {/* CTA Buttons */}
                    <div className="mt-auto">
                      <Link href={tier.ctaPrimaryLink}>
                        <Button
                          variant={tier.popular ? 'primary' : 'secondary'}
                          className="w-full"
                        >
                          {tier.ctaPrimary}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Selected Tier Details */}
      {selectedTier && (
        <section className="relative py-16 bg-dark-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {pricingTiers.filter(t => t.id === selectedTier).map(tier => {
              const Icon = tier.icon
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-2xl p-8 border-white/10"
                >
                  <div className="flex items-start gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-xl ${getColorClasses(tier.color, 'bg')} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-8 h-8 ${getColorClasses(tier.color, 'text')}`} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-3xl font-bold mb-2">{tier.name} Plan Details</h2>
                      <p className="text-white/60 text-lg">{tier.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-electric-500" />
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full ${getColorClasses(tier.color, 'bg')} flex items-center justify-center mt-0.5`}>
                              <Check className={`w-3 h-3 ${getColorClasses(tier.color, 'text')}`} />
                            </div>
                            <span className="text-white/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For & Additional Info */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4">Best For</h3>
                        <p className="text-white/80">{tier.bestFor}</p>
                      </div>

                      <div className="glass-card p-6 rounded-xl border border-white/10">
                        <h4 className="font-bold mb-2">Additional Seats</h4>
                        <p className="text-white/80">{tier.additionalSeats}</p>
                      </div>

                      <div className="flex gap-3">
                        <Link href={tier.ctaPrimaryLink} className="flex-1">
                          <Button variant="primary" className="w-full">
                            {tier.ctaPrimary}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Feature Comparison Table */}
      <section className="relative py-16 bg-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-display mb-4">
              Compare All Features
            </h2>
            <p className="text-white/60 text-lg">
              Detailed feature comparison across all tiers
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 font-bold text-white/80">Feature</th>
                  <th className="text-center py-4 px-4 font-bold">Developer</th>
                  <th className="text-center py-4 px-4 font-bold">Startup</th>
                  <th className="text-center py-4 px-4 font-bold text-electric-500">Professional</th>
                  <th className="text-center py-4 px-4 font-bold">Enterprise</th>
                  <th className="text-center py-4 px-4 font-bold text-amber-500">Enterprise Plus</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category, catIdx) => (
                  <>
                    <tr key={`cat-${catIdx}`} className="bg-white/5">
                      <td colSpan={6} className="py-3 px-4 font-bold text-electric-500">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featIdx) => (
                      <tr key={`feat-${catIdx}-${featIdx}`} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-white/80">{feature.name}</td>
                        <td className="py-3 px-4 text-center">
                          {typeof feature.developer === 'boolean' ? (
                            feature.developer ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-white/20 mx-auto" />
                            )
                          ) : (
                            <span className="text-white/80">{feature.developer}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {typeof feature.startup === 'boolean' ? (
                            feature.startup ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-white/20 mx-auto" />
                            )
                          ) : (
                            <span className="text-white/80">{feature.startup}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center bg-electric-500/5">
                          {typeof feature.professional === 'boolean' ? (
                            feature.professional ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-white/20 mx-auto" />
                            )
                          ) : (
                            <span className="text-white/80">{feature.professional}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {typeof feature.enterprise === 'boolean' ? (
                            feature.enterprise ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-white/20 mx-auto" />
                            )
                          ) : (
                            <span className="text-white/80">{feature.enterprise}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center bg-amber-500/5">
                          {typeof feature.enterprisePlus === 'boolean' ? (
                            feature.enterprisePlus ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-white/20 mx-auto" />
                            )
                          ) : (
                            <span className="text-white/80">{feature.enterprisePlus}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why BlockSecOps Different */}
      <section className="relative py-16 bg-dark-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-display mb-4">
              Why BlockSecOps is{' '}
              <span className="gradient-text">
                Different
              </span>
            </h2>
            <p className="text-white/60 text-xl max-w-3xl mx-auto">
              The industry's first vendor-agnostic vulnerability management platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Unified Platform Approach',
                items: [
                  'Centralized vulnerability management across all your projects',
                  'Consolidated metrics and security posture tracking',
                  'Single dashboard for all chains and contracts',
                ],
              },
              {
                title: 'Vendor-Agnostic Integration',
                items: [
                  'Our proprietary scanners included',
                  'Integrate your existing security tools',
                  'No vendor lock-in—use what works for your team',
                ],
              },
              {
                title: 'Continuous Security',
                items: [
                  'Automated CI/CD scanning on every commit',
                  'Proactive threat detection, not reactive audits',
                  '24/7 monitoring vs point-in-time snapshots',
                ],
              },
              {
                title: 'Platform vs Plugins',
                items: [
                  'Comprehensive metrics and trending analysis',
                  'Team collaboration and workflow management',
                  'Enterprise-grade reporting and compliance',
                ],
              },
              {
                title: 'Multi-Chain Native',
                items: [
                  'Built from the ground up for cross-chain security',
                  'Understand exploit patterns across ecosystems',
                  'Deploy once, protect everywhere',
                ],
              },
              {
                title: 'Cost-Effective',
                items: [
                  'Continuous protection at fraction of audit costs',
                  'Replace 2-3 annual audits with ongoing security',
                  'ROI increases with team size and project count',
                ],
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="glass rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold mb-4 text-electric-500">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-electric-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative py-16 bg-dark-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-display mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'What counts as a "project"?',
                a: 'One deployed dApp across all chains counts as one project. For example, if you deploy the same protocol on Ethereum, Arbitrum, and Optimism, that\'s one project, not three.',
              },
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: 'Yes, you can upgrade anytime and we\'ll pro-rate the difference. Downgrades take effect at your next renewal period.',
              },
              {
                q: 'What happens if I exceed my developer seats?',
                a: 'You have a 10% grace period. Beyond that, additional seats are automatically added at $100-$200/seat/month depending on your tier.',
              },
              {
                q: 'Do you offer discounts for non-profits or open-source projects?',
                a: 'Yes! We offer 50% discounts for verified non-profits and significant open-source projects. Contact us to apply.',
              },
              {
                q: 'How does pricing compare to traditional security approaches?',
                a: 'Traditional point-in-time audits cost $25K-$75K per audit for snapshot coverage. IDE plugins are free but fragmented with no unified metrics. Our Professional tier at $50K/year provides continuous 24/7 security—equivalent to 2-3 audits worth of protection, but ongoing.',
              },
              {
                q: 'What chains do you support?',
                a: 'Currently: Ethereum, Solana, StarkNet, Avalanche, Arbitrum, Optimism, Polygon, Base, and more. Enterprise customers get priority requests for new chains.',
              },
              {
                q: 'Can I try before I buy?',
                a: 'Absolutely! Developer and Startup tiers include free trials (14 and 30 days). Professional and Enterprise tiers include hands-on POC pilots.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="glass rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-bold mb-2 text-electric-500">{faq.q}</h3>
                <p className="text-white/80">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-16 bg-dark-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-white/60 text-lg mb-8">
              Join hundreds of teams protecting billions in blockchain assets
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <Button variant="primary" className="px-8">
                  Contact Sales
                </Button>
              </Link>
            </div>
            <p className="text-white/40 text-sm mt-6">
              30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
