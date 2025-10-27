'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button, Input, Textarea, Card } from '@/components/ui'
import { Turnstile } from '@marsidev/react-turnstile'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [captchaToken, setCaptchaToken] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    if (!captchaToken) {
      setStatus('error')
      setErrorMessage('Please complete the CAPTCHA verification')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, captchaToken }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
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
    <Card variant="glass" className="p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
            Name <span className="text-electric-500">*</span>
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder="John Doe"
            error={!!errors.name}
            disabled={status === 'submitting'}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
            Email <span className="text-electric-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            error={!!errors.email}
            disabled={status === 'submitting'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
            Company
          </label>
          <Input
            id="company"
            {...register('company')}
            placeholder="Your Company"
            disabled={status === 'submitting'}
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
            Subject <span className="text-electric-500">*</span>
          </label>
          <Input
            id="subject"
            {...register('subject')}
            placeholder="How can we help you?"
            error={!!errors.subject}
            disabled={status === 'submitting'}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
            Message <span className="text-electric-500">*</span>
          </label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Tell us more about your inquiry..."
            rows={5}
            error={!!errors.message}
            disabled={status === 'submitting'}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
          )}
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
            <p className="text-sm">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
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
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
