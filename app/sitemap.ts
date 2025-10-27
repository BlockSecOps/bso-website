import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blocksecops.com'

  // Static routes
  const routes = [
    '',
    '/contact',
    '/request-demo',
    '/docs',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Fetch blog posts from Payload
  const payload = await getPayload({ config })
  const { docs: blogPosts } = await payload.find({
    collection: 'blog',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 1000,
  })

  const blogRoutes = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Add docs routes - these will be automatically updated from your MDX content
  // You can fetch these dynamically from your docs system if needed
  const docsRoutes = [
    '/docs/getting-started',
    '/docs/installation',
    '/docs/configuration',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes, ...docsRoutes]
}
