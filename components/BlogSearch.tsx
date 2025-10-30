'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags?: string[]
  author: string
  publishedAt: string
  readTime?: number
  featuredImage?: string | { url?: string; filename?: string; alt?: string }
  featured?: boolean
}

interface BlogSearchProps {
  posts: BlogPost[]
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter posts based on search query only
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = post.title.toLowerCase().includes(query)
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query)
        const matchesCategory = post.category.toLowerCase().includes(query)
        const matchesTags = post.tags?.some((tag) => tag.toLowerCase().includes(query))
        const matchesAuthor = post.author.toLowerCase().includes(query)

        return matchesTitle || matchesExcerpt || matchesCategory || matchesTags || matchesAuthor
      }

      return true
    })
  }, [posts, searchQuery])

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search articles by title, content, tags, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-dark-300 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {searchQuery && (
          <div className="text-sm text-white/50">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </div>
        )}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && searchQuery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-300 mb-4">
            <svg
              className="w-8 h-8 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">No articles found</h3>
          <p className="text-white/70 mb-6">
            Try adjusting your search term
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 border-b border-white/10 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">
              {featuredPosts.length > 0 ? 'All Posts' : 'Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Draft'

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-dark-300 rounded-lg overflow-hidden hover:shadow-glow transition-all duration-300"
    >
      {post.featuredImage && (
        <div className="aspect-video bg-dark-200 overflow-hidden">
          <img
            src={
              typeof post.featuredImage === 'string'
                ? post.featuredImage
                : post.featuredImage.url || `/uploads/${post.featuredImage.filename}`
            }
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className={`p-6 ${featured ? 'min-h-[200px]' : ''}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium px-3 py-1 bg-primary-400/10 text-primary-400 rounded-full">
            {post.category.replace('-', ' ')}
          </span>
          {post.readTime && (
            <span className="text-xs text-white/50">{post.readTime} min read</span>
          )}
        </div>
        <h3
          className={`font-bold mb-2 group-hover:text-primary-400 transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}
        >
          {post.title}
        </h3>
        <p className="text-white/70 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-white/50">
          <span>{post.author}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  )
}
