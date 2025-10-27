'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button, Input, Textarea, Card } from '@/components/ui'
import { Turnstile } from '@marsidev/react-turnstile'

const demoRequestSchema = z.object({
  contactName: z.string().min(2, 'Name must be at least 2 characters'),
  contactEmail: z.string().email('Please enter a valid email address'),
  contactPhone: z.string().optional(),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  companyWebsite: z.string().optional(),
  industry: z.enum(['defi', 'nft-gaming', 'infrastructure', 'exchange', 'enterprise', 'other']).optional(),
  useCase: z.string().min(10, 'Please describe your use case (at least 10 characters)'),
  additionalNotes: z.string().optional(),
})

type DemoRequestFormData = z.infer<typeof demoRequestSchema>

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function DemoRequestForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [captchaToken, setCaptchaToken] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
  })

  const onSubmit = async (data: DemoRequestFormData) => {
    if (!captchaToken) {
      setStatus('error')
      setErrorMessage('Please complete the CAPTCHA verification')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, captchaToken }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit demo request')
      }

      setStatus('success')
      reset()
      setCaptchaToken('')

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.')

      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <Card variant="glass" className="p-8 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Name */}
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-white/80 mb-2">
                Your Name <span className="text-electric-500">*</span>
              </label>
              <Input
                id="contactName"
                {...register('contactName')}
                placeholder="John Doe"
                error={!!errors.contactName}
                disabled={status === 'submitting'}
              />
              {errors.contactName && (
                <p className="mt-1 text-sm text-red-400">{errors.contactName.message}</p>
              )}
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-white/80 mb-2">
                Email Address <span className="text-electric-500">*</span>
              </label>
              <Input
                id="contactEmail"
                type="email"
                {...register('contactEmail')}
                placeholder="john@company.com"
                error={!!errors.contactEmail}
                disabled={status === 'submitting'}
              />
              {errors.contactEmail && (
                <p className="mt-1 text-sm text-red-400">{errors.contactEmail.message}</p>
              )}
            </div>
          </div>

          {/* Contact Phone */}
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-white/80 mb-2">
              Phone Number
            </label>
            <Input
              id="contactPhone"
              type="tel"
              {...register('contactPhone')}
              placeholder="+1 (555) 123-4567"
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        {/* Company Information Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
            Company Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-white/80 mb-2">
                Company Name <span className="text-electric-500">*</span>
              </label>
              <Input
                id="companyName"
                {...register('companyName')}
                placeholder="Your Company"
                error={!!errors.companyName}
                disabled={status === 'submitting'}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-400">{errors.companyName.message}</p>
              )}
            </div>

            {/* Company Size */}
            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-white/80 mb-2">
                Company Size <span className="text-electric-500">*</span>
              </label>
              <select
                id="companySize"
                {...register('companySize')}
                className="w-full px-4 py-3 bg-dark-300/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'submitting'}
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
              {errors.companySize && (
                <p className="mt-1 text-sm text-red-400">{errors.companySize.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Website */}
            <div>
              <label htmlFor="companyWebsite" className="block text-sm font-medium text-white/80 mb-2">
                Company Website
              </label>
              <Input
                id="companyWebsite"
                type="url"
                {...register('companyWebsite')}
                placeholder="https://yourcompany.com"
                disabled={status === 'submitting'}
              />
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-white/80 mb-2">
                Industry
              </label>
              <select
                id="industry"
                {...register('industry')}
                className="w-full px-4 py-3 bg-dark-300/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'submitting'}
              >
                <option value="">Select industry</option>
                <option value="defi">DeFi</option>
                <option value="nft-gaming">NFT/Gaming</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="exchange">Exchange/Trading</option>
                <option value="enterprise">Enterprise Blockchain</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Use Case Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
            Tell Us About Your Needs
          </h3>

          {/* Use Case */}
          <div>
            <label htmlFor="useCase" className="block text-sm font-medium text-white/80 mb-2">
              What would you like to use BlockSecOps for? <span className="text-electric-500">*</span>
            </label>
            <Textarea
              id="useCase"
              {...register('useCase')}
              placeholder="Tell us about your security needs, use cases, or specific challenges you're facing..."
              rows={4}
              error={!!errors.useCase}
              disabled={status === 'submitting'}
            />
            {errors.useCase && (
              <p className="mt-1 text-sm text-red-400">{errors.useCase.message}</p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-white/80 mb-2">
              Additional Information or Questions
            </label>
            <Textarea
              id="additionalNotes"
              {...register('additionalNotes')}
              placeholder="Any other details or questions you'd like to share..."
              rows={3}
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        {/* CAPTCHA */}
        <div className="flex justify-center">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAB8FmCmHbTzba5im'}
            onSuccess={(token) => setCaptchaToken(token)}
            onError={() => setCaptchaToken('')}
            onExpire={() => setCaptchaToken('')}
            options={{ theme: 'dark' }}
          />
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Thank you! Your demo request has been submitted successfully. We'll be in touch soon to schedule your demo.</p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{errorMessage}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Request Demo
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
