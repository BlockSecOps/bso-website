import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BlogSearch } from '@/components/BlogSearch'
import { Navigation } from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Blog - BlockSecOps',
  description: 'Latest insights on Web3 security, smart contract auditing, and blockchain DevSecOps best practices.',
}

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'blog',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 100,
  })

  return (
    <div className="min-h-screen bg-dark-400">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-300 to-dark-400 pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            BlockSecOps <span className="text-primary-400">Blog</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Expert insights on Web3 security, smart contract vulnerabilities, and the latest in blockchain DevSecOps
          </p>
        </div>
      </section>

      {/* Search and Posts */}
      <div className="py-12">
        <BlogSearch posts={posts as any} />
      </div>
    </div>
  )
}
