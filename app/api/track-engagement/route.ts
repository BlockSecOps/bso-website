import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, timeOnPage } = body

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Find the blog post
    const { docs } = await payload.find({
      collection: 'blog',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (docs.length === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const post = docs[0]
    const currentViews = post.views || 0
    const currentScore = post.engagementScore || 0

    // Calculate engagement score
    // Formula: views count as 1 point each, every 30 seconds on page = 1 point
    const timePoints = timeOnPage ? Math.floor(timeOnPage / 30) : 0
    const newViews = currentViews + 1
    const newScore = currentScore + 1 + timePoints // +1 for the view, + time points

    // Update the post
    await payload.update({
      collection: 'blog',
      id: post.id,
      data: {
        views: newViews,
        engagementScore: newScore,
      },
    })

    return NextResponse.json(
      {
        success: true,
        views: newViews,
        engagementScore: newScore,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Engagement tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track engagement' },
      { status: 500 }
    )
  }
}
