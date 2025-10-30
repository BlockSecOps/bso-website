import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Check if email already exists
    const existing = await payload.find({
      collection: 'newsletter-subscriptions',
      where: {
        email: {
          equals: email.toLowerCase().trim(),
        },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter' },
        { status: 409 }
      )
    }

    // Create subscription
    await payload.create({
      collection: 'newsletter-subscriptions',
      data: {
        email: email.toLowerCase().trim(),
        source: 'blog-sidebar',
        status: 'active',
        subscribedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}
