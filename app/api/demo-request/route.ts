import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { verifyCaptcha } from '@/lib/verifyCaptcha'

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
  captchaToken: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = demoRequestSchema.parse(body)

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
      collection: 'demo-requests',
      data: {
        contactName: validatedData.contactName,
        contactEmail: validatedData.contactEmail,
        contactPhone: validatedData.contactPhone || '',
        companyName: validatedData.companyName,
        companySize: validatedData.companySize,
        companyWebsite: validatedData.companyWebsite || '',
        industry: validatedData.industry || '',
        useCase: validatedData.useCase,
        additionalNotes: validatedData.additionalNotes || '',
        status: 'new',
        submittedAt: new Date().toISOString(),
      },
    })

    console.log('✅ Demo request saved to Payload CMS')

    return NextResponse.json(
      { success: true, message: 'Demo request submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Demo request error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit demo request. Please try again later.' },
      { status: 500 }
    )
  }
}
