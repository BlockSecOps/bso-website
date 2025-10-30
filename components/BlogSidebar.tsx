'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Heading {
  id: string
  text: string
  level: number
}

interface Post {
  id: string
  title: string
  slug: string
  category: string
  readTime?: number
  publishedAt?: string
}

interface BlogSidebarProps {
  relatedPosts?: Post[]
  recentPosts?: Post[]
  popularPosts?: Post[]
  content: string
}

export function BlogSidebar({ relatedPosts = [], recentPosts = [], popularPosts = [], content }: BlogSidebarProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^##\s+(.+)$/gm
    const extractedHeadings: Heading[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[1]
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      extractedHeadings.push({
        id,
        text,
        level: 2,
      })
    }

    setHeadings(extractedHeadings)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    )

    // Observe all headings
    const headingElements = document.querySelectorAll('h2[id], h3[id]')
    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [content])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message })
        setEmail('')
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to subscribe' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <aside className="space-y-8">
      {/* Table of Contents */}
      {headings.length > 0 && (
        <div className="bg-dark-300 rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
            Table of Contents
          </h3>
          <nav className="space-y-2">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => handleClick(heading.id)}
                className={`block text-sm text-left w-full py-1 px-2 rounded transition-colors ${
                  activeId === heading.id
                    ? 'text-primary-400 bg-primary-400/10 font-medium'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="bg-dark-300 rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Recent Posts
          </h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="text-xs text-primary-400 mb-1">
                  {post.category.replace('-', ' ')}
                </div>
                <h4 className="text-sm font-medium group-hover:text-primary-400 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  {post.readTime && (
                    <span className="text-xs text-white/50">{post.readTime} min read</span>
                  )}
                  {post.publishedAt && (
                    <span className="text-xs text-white/50">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <div className="bg-dark-300 rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Popular Posts
          </h3>
          <div className="space-y-4">
            {popularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="text-xs text-primary-400 mb-1">
                  {post.category.replace('-', ' ')}
                </div>
                <h4 className="text-sm font-medium group-hover:text-primary-400 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                {post.readTime && (
                  <div className="text-xs text-white/50 mt-1">
                    {post.readTime} min read
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-dark-300 rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Related Posts
          </h3>
          <div className="space-y-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="text-xs text-primary-400 mb-1">
                  {post.category.replace('-', ' ')}
                </div>
                <h4 className="text-sm font-medium group-hover:text-primary-400 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                {post.readTime && (
                  <div className="text-xs text-white/50 mt-1">
                    {post.readTime} min read
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <div className="bg-dark-300 rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share This Article
        </h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              const url = window.location.href
              navigator.clipboard.writeText(url)
              alert('Link copied to clipboard!')
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy Link
          </button>
          <button
            onClick={() => {
              const url = encodeURIComponent(window.location.href)
              const text = encodeURIComponent(document.title)
              window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer')
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </button>
          <button
            onClick={() => {
              const url = encodeURIComponent(window.location.href)
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer')
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Share on LinkedIn
          </button>
          <button
            onClick={() => {
              const url = encodeURIComponent(window.location.href)
              const title = encodeURIComponent(document.title)
              window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank', 'noopener,noreferrer')
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
            </svg>
            Share on Reddit
          </button>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-lg p-6 border border-primary-400/20">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-400/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
            <p className="text-sm text-white/70 mb-4">
              Get the latest Web3 security insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-dark-300 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-400 transition-colors text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-400 text-dark-400 rounded-lg hover:bg-primary-300 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                {!isSubmitting && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {message && (
                <p className={`text-xs ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </aside>
  )
}
