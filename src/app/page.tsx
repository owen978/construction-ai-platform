export const revalidate = 3600

import { getFeaturedWorkflows } from '@/lib/queries/workflows'
import { getRoles } from '@/lib/queries/roles'
import { getLatestGuides } from '@/lib/queries/guides'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { FeaturedWorkflows } from '@/components/sections/featured-workflows'
import { RoleGrid } from '@/components/sections/role-grid'
import { LatestGuides } from '@/components/sections/latest-guides'
import { CTASection } from '@/components/sections/cta-section'
import { NewsletterCTA } from '@/components/sections/newsletter-cta'
import { websiteSchema, jsonLdScriptProps } from '@/lib/schema'

/** Flagship guides that must always be surfaced from the homepage. */
const HOMEPAGE_GUIDE_SLUGS = [
  'what-is-a-rams-construction-guide',
  'ai-for-quantity-surveyors-guide',
  'construction-cost-plan-guide',
  'ai-tender-analysis-guide',
]

export default async function HomePage() {
  const [featuredWorkflows, roles, latestGuides] = await Promise.all([
    getFeaturedWorkflows(),
    getRoles(),
    getLatestGuides(6, HOMEPAGE_GUIDE_SLUGS),
  ])

  return (
    <>
      <script {...jsonLdScriptProps(websiteSchema())} />
      <Hero />
      <StatsBar />
      <FeaturedWorkflows workflows={featuredWorkflows} />
      <RoleGrid roles={roles} />
      <LatestGuides guides={latestGuides} />
      <NewsletterCTA />
      <CTASection />
    </>
  )
}
