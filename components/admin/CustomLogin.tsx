'use client'

import { Turnstile } from '@marsidev/react-turnstile'
import { useState, useEffect } from 'react'

export function CaptchaComponent() {
  const [token, setToken] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleVerify = (captchaToken: string) => {
    setToken(captchaToken)
    setError('')

    // Store token in session storage for the login request
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('captcha-token', captchaToken)
    }
  }

  const handleError = () => {
    setError('CAPTCHA verification failed. Please try again.')
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('captcha-token')
    }
  }

  const handleExpire = () => {
    setToken('')
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('captcha-token')
    }
  }

  // Intercept form submissions to add CAPTCHA token
  useEffect(() => {
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement

      // Check if this is the login form
      if (form && form.querySelector('[name="email"]') && form.querySelector('[name="password"]')) {
        const captchaToken = sessionStorage.getItem('captcha-token')

        if (!captchaToken) {
          e.preventDefault()
          setError('Please complete the CAPTCHA verification')
          return
        }

        // Add CAPTCHA token to the form data
        const hiddenInput = document.createElement('input')
        hiddenInput.type = 'hidden'
        hiddenInput.name = 'captcha-token'
        hiddenInput.value = captchaToken
        form.appendChild(hiddenInput)
      }
    }

    document.addEventListener('submit', handleFormSubmit, true)

    return () => {
      document.removeEventListener('submit', handleFormSubmit, true)
    }
  }, [])

  // Get the site key from environment or use test key
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <Turnstile
          siteKey={siteKey}
          onSuccess={handleVerify}
          onError={handleError}
          onExpire={handleExpire}
          options={{
            theme: 'dark',
            size: 'normal',
          }}
        />
      </div>

      {error && (
        <div
          style={{
            color: '#ef4444',
            fontSize: '0.875rem',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}
