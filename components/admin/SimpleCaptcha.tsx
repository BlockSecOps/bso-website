'use client'

import { Turnstile } from '@marsidev/react-turnstile'
import { useEffect } from 'react'

export function SimpleCaptcha() {
  useEffect(() => {
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement
      if (form && form.querySelector('[name="email"]')) {
        const token = sessionStorage.getItem('captcha-token')
        if (!token) {
          e.preventDefault()
          alert('Please complete CAPTCHA verification')
          return
        }
        // Add token to form
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = 'captcha-token'
        input.value = token
        form.appendChild(input)
      }
    }
    document.addEventListener('submit', handleFormSubmit, true)
    return () => document.removeEventListener('submit', handleFormSubmit, true)
  }, [])

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAB8FmCmHbTzba5im'

  return (
    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={(token) => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('captcha-token', token)
          }
        }}
        onError={() => {
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('captcha-token')
          }
        }}
        onExpire={() => {
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('captcha-token')
          }
        }}
        options={{ theme: 'dark' }}
      />
    </div>
  )
}
