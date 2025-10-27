import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { verifyCaptcha } from '@/lib/verifyCaptcha'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  captchaToken: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Verify CAPTCHA
    const isCaptchaValid = await verifyCaptcha(validatedData.captchaToken)
    if (!isCaptchaValid) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed. Please try again.' },
        { status: 403 }
      )
    }

    // Save to Payload CMS
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || '',
        subject: validatedData.subject,
        message: validatedData.message,
        status: 'new',
        submittedAt: new Date().toISOString(),
      },
    })

    console.log('✅ Contact form submission saved to Payload CMS')

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
