import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { BlogPromoBlurb } from '@/components/BlogPromoBlurb'
import { Navigation } from '@/components/Navigation'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blog',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const post = docs[0]

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - BlockSecOps Blog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blog',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 1000,
  })

  return docs.map((post: any) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blog',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
  })

  const post = docs[0]

  if (!post) {
    notFound()
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="min-h-screen bg-dark-400">
      <Navigation />
      {/* Back Button */}
      <div className="border-b border-white/10 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/70 hover:text-primary-400 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium px-3 py-1 bg-primary-400/10 text-primary-400 rounded-full">
                {post.category.replace('-', ' ')}
              </span>
              {post.readTime && (
                <span className="text-sm text-white/50">{post.readTime} min read</span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-between text-sm text-white/50 pt-6 border-t border-white/10">
              <span className="font-medium">{post.author}</span>
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <MarkdownRenderer content={post.content || ''} />

          {/* Promotional Blurb */}
          <BlogPromoBlurb />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-sm font-medium text-white/50 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 bg-dark-300 text-white/70 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

