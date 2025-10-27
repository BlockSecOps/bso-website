import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Inline CAPTCHA verification function
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

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- BlockSecOps Admin',
      description: 'Secure admin panel for BlockSecOps platform',
    },
  },
  collections: [
    // Users collection for admin authentication
    {
      slug: 'users',
      auth: {
        verify: false,
        tokenExpiration: 7200, // 2 hours
        maxLoginAttempts: 5,
        lockTime: 600000, // 10 minutes
      },
      // CAPTCHA verification now handled in custom login page at /admin-login
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
    },
    // Blog collection
    {
      slug: 'blog',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'category', 'status', 'publishedAt'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL-friendly version of the title',
          },
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          defaultValue: 'BlockSecOps Team',
        },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Security Research', value: 'security-research' },
            { label: 'Product Updates', value: 'product-updates' },
            { label: 'Industry News', value: 'industry-news' },
            { label: 'Best Practices', value: 'best-practices' },
            { label: 'Case Studies', value: 'case-studies' },
            { label: 'Tutorials', value: 'tutorials' },
          ],
        },
        {
          name: 'featuredImage',
          type: 'text',
          admin: {
            description: 'URL to the featured image',
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Short description for SEO and preview cards',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Blog content in Markdown format. Supports headings, code blocks, lists, links, bold, italic, etc.',
            rows: 30,
          },
        },
        {
          name: 'tags',
          type: 'text',
          hasMany: true,
          admin: {
            description: 'Tags for categorization (e.g., solidity, defi, security)',
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show in featured blog posts section',
          },
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            description: 'When the post was/will be published',
          },
        },
        {
          name: 'readTime',
          type: 'number',
          admin: {
            description: 'Estimated read time in minutes',
          },
        },
      ],
    },
    // Docs collection
    {
      slug: 'docs',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'status', 'updatedAt'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL-friendly version of the title',
          },
        },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Getting Started', value: 'getting-started' },
            { label: 'Platform Overview', value: 'platform-overview' },
            { label: 'Security Tools', value: 'security-tools' },
            { label: 'API Reference', value: 'api-reference' },
            { label: 'Guides', value: 'guides' },
            { label: 'FAQ', value: 'faq' },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => defaultFeatures,
          }),
        },
        {
          name: 'excerpt',
          type: 'textarea',
          admin: {
            description: 'Short description for SEO and previews',
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show in featured docs section',
          },
        },
      ],
    },
    // Wiki collection
    {
      slug: 'wiki',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'difficulty', 'status', 'updatedAt'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Smart Contract Security', value: 'smart-contract-security' },
            { label: 'DeFi Exploits', value: 'defi-exploits' },
            { label: 'Best Practices', value: 'best-practices' },
            { label: 'Case Studies', value: 'case-studies' },
            { label: 'Vulnerability Analysis', value: 'vulnerability-analysis' },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => defaultFeatures,
          }),
        },
        {
          name: 'excerpt',
          type: 'textarea',
        },
        {
          name: 'difficulty',
          type: 'select',
          required: true,
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
        },
        {
          name: 'tags',
          type: 'text',
          hasMany: true,
          admin: {
            description: 'Tags for categorization (e.g., solidity, reentrancy, defi)',
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        },
      ],
    },
    // Contact submissions collection
    {
      slug: 'contact-submissions',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'company', 'status', 'submittedAt'],
        description: 'Contact form submissions from the website',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'company',
          type: 'text',
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Responded', value: 'responded' },
            { label: 'Closed', value: 'closed' },
          ],
        },
        {
          name: 'submittedAt',
          type: 'date',
          required: true,
          admin: {
            description: 'When the form was submitted',
          },
        },
      ],
    },
    // Demo Requests collection
    {
      slug: 'demo-requests',
      admin: {
        useAsTitle: 'contactName',
        defaultColumns: ['contactName', 'contactEmail', 'companyName', 'status', 'submittedAt'],
        description: 'Demo request submissions from the website',
      },
      fields: [
        {
          name: 'contactName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the person requesting the demo',
          },
        },
        {
          name: 'contactEmail',
          type: 'email',
          required: true,
          admin: {
            description: 'Email address of the person requesting the demo',
          },
        },
        {
          name: 'contactPhone',
          type: 'text',
          admin: {
            description: 'Phone number of the person requesting the demo',
          },
        },
        {
          name: 'companyName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the company',
          },
        },
        {
          name: 'companySize',
          type: 'select',
          required: true,
          options: [
            { label: '1-10 employees', value: '1-10' },
            { label: '11-50 employees', value: '11-50' },
            { label: '51-200 employees', value: '51-200' },
            { label: '201-500 employees', value: '201-500' },
            { label: '500+ employees', value: '500+' },
          ],
          admin: {
            description: 'Size of the company',
          },
        },
        {
          name: 'companyWebsite',
          type: 'text',
          admin: {
            description: 'Company website URL',
          },
        },
        {
          name: 'industry',
          type: 'select',
          options: [
            { label: 'DeFi', value: 'defi' },
            { label: 'NFT/Gaming', value: 'nft-gaming' },
            { label: 'Infrastructure', value: 'infrastructure' },
            { label: 'Exchange/Trading', value: 'exchange' },
            { label: 'Enterprise Blockchain', value: 'enterprise' },
            { label: 'Other', value: 'other' },
          ],
          admin: {
            description: 'Industry or sector',
          },
        },
        {
          name: 'useCase',
          type: 'textarea',
          required: true,
          admin: {
            description: 'What they want to use the platform for',
          },
        },
        {
          name: 'additionalNotes',
          type: 'textarea',
          admin: {
            description: 'Any additional information or questions',
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Demo Scheduled', value: 'demo-scheduled' },
            { label: 'Demo Completed', value: 'demo-completed' },
            { label: 'Converted', value: 'converted' },
            { label: 'Not Qualified', value: 'not-qualified' },
          ],
        },
        {
          name: 'submittedAt',
          type: 'date',
          required: true,
          admin: {
            description: 'When the demo request was submitted',
          },
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
})
