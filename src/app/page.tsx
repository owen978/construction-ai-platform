export const dynamic = 'force-dynamic'

import { getFeaturedWorkflows } from '@/lib/queries/workflows'
import { getRoles } from '@/lib/queries/roles'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { FeaturedWorkflows } from '@/components/sections/featured-workflows'
import { RoleGrid } from '@/components/sections/role-grid'
import { CTASection } from '@/components/sections/cta-section'
import { NewsletterCTA } from '@/components/sections/newsletter-cta'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BuildCopilot',
  alternateName: 'BuildCopilot — The AI Operating System for Construction',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai',
  description:
    'Ready-to-use AI workflows, prompts, and guides for construction professionals. Save hours every week with BuildCopilot.',
  publisher: {
    '@type': 'Organization',
    name: 'BuildCopilot',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai',
  },
}

export default async function HomePage() {
  const [featuredWorkflows, roles] = await Promise.all([
    getFeaturedWorkflows(),
    getRoles(),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <StatsBar />
      <FeaturedWorkflows workflows={featuredWorkflows} />
      <RoleGrid roles={roles} />
      <NewsletterCTA />
      <CTASection />
    </>
  )
}
