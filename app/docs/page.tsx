import { DocsHero, KnowledgeBase, PlatformDocs } from '@/components/docs-sections'
import { Navigation } from '@/components/Navigation'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-dark-400">
      <Navigation />
      <DocsHero />
      <PlatformDocs />
      <KnowledgeBase />
    </div>
  )
}
