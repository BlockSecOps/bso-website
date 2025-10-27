'use client'

import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAB8FmCmHbTzba5im'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!captchaToken) {
      setError('Please complete the CAPTCHA verification')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          'captcha-token': captchaToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Redirect to admin dashboard
      router.push('/admin')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '1rem',
    }}>
      <div style={{
        background: '#1e293b',
        padding: '3rem 2rem',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        maxWidth: '420px',
        width: '100%',
        border: '1px solid #334155',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#f8fafc',
            marginBottom: '0.5rem',
          }}>
            BlockSecOps Admin
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#e2e8f0',
              marginBottom: '0.5rem',
            }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '6px',
                color: '#f8fafc',
                fontSize: '0.875rem',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#e2e8f0',
              marginBottom: '0.5rem',
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '6px',
                color: '#f8fafc',
                fontSize: '0.875rem',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />
          </div>

          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Turnstile
              siteKey={siteKey}
              onSuccess={(token) => setCaptchaToken(token)}
              onError={() => {
                setCaptchaToken('')
                setError('CAPTCHA verification failed. Please try again.')
              }}
              onExpire={() => setCaptchaToken('')}
              options={{
                theme: 'dark',
                size: 'normal',
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              background: '#7f1d1d',
              border: '1px solid #991b1b',
              borderRadius: '6px',
              color: '#fecaca',
              fontSize: '0.875rem',
              marginBottom: '1rem',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !captchaToken}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: captchaToken && !loading ? '#3b82f6' : '#475569',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: captchaToken && !loading ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              if (captchaToken && !loading) {
                e.currentTarget.style.background = '#2563eb'
              }
            }}
            onMouseLeave={(e) => {
              if (captchaToken && !loading) {
                e.currentTarget.style.background = '#3b82f6'
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: '#64748b',
        }}>
          Protected by Cloudflare Turnstile
        </div>
      </div>
    </div>
  )
}
