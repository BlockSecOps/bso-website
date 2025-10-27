'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button, Badge } from '@/components/ui'

const plans = [
  {
    name: 'Starter',
    price: '$10K',
    period: '/year',
    description: 'Perfect for small teams',
    features: [
      'Up to 5 projects',
      '10 security tools',
      'Basic support',
      'Email support',
      'Community access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$50K',
    period: '/year',
    description: 'For growing enterprises',
    features: [
      'Unlimited projects',
      '25+ security tools',
      'Priority support',
      'CI/CD integration',
      'Advanced analytics',
      'Dedicated success manager',
    ],
    cta: 'Request Demo',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$150K',
    period: '/year',
    description: 'For large organizations',
    features: [
      'Everything in Professional',
      'Custom integrations',
      'SLA guarantees',
      'Advanced compliance',
      'SAML/SSO',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-dark-400 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[120px]" />

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
              Pricing
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
            Plans That Scale
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-500 to-purple-500">
              With Your Needs
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Choose the plan that fits your team size and security requirements.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative ${
                plan.popular ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              <div
                className={`glass rounded-2xl p-8 h-full flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? 'border-electric-500/50 shadow-neon scale-105'
                    : 'border-white/10 hover:border-electric-500/30'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="bg-electric-500 text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-white/60 text-lg">{plan.period}</span>
                </div>

                {/* Description */}
                <p className="text-white/60 mb-8">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-electric-500/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-electric-500" />
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 text-sm">
            All plans include: SOC2 compliance, 99.9% uptime SLA, data encryption at rest and in transit
          </p>
        </motion.div>
      </div>
    </section>
  )
}
