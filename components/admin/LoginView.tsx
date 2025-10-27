'use client'

import { LoginView as DefaultLoginView } from '@payloadcms/next/views'
import { Turnstile } from '@marsidev/react-turnstile'
import { useState, useEffect } from 'react'

export function LoginView(props: any) {
  const [token, setToken] = useState<string>('')

  const handleVerify = (captchaToken: string) => {
    setToken(captchaToken)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('captcha-token', captchaToken)
    }
  }

  const handleError = () => {
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

      if (form && form.querySelector('[name="email"]') && form.querySelector('[name="password"]')) {
        const captchaToken = sessionStorage.getItem('captcha-token')

        if (!captchaToken) {
          e.preventDefault()
          alert('Please complete the CAPTCHA verification')
          return
        }

        // Add CAPTCHA token to form data
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

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', marginTop: '2rem' }}>
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
      <DefaultLoginView {...props} />
    </>
  )
}
