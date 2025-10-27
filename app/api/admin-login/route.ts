import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// CAPTCHA verification function
async function verifyCaptcha(token: string): Promise<boolean> {
  if (!token) {
    return false
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured')
    return false
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('CAPTCHA verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, 'captcha-token': captchaToken } = body

    // Verify CAPTCHA first
    if (!captchaToken) {
      return NextResponse.json(
        { error: 'CAPTCHA verification required' },
        { status: 400 }
      )
    }

    const isCaptchaValid = await verifyCaptcha(captchaToken)
    if (!isCaptchaValid) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Get Payload instance
    const payload = await getPayload({ config })

    // Attempt login
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (!result.token) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create response with auth cookie
    const response = NextResponse.json({ success: true })

    // Set the Payload auth cookie
    response.cookies.set('payload-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7200, // 2 hours
      path: '/',
    })

    return response
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    )
  }
}
