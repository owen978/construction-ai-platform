export const revalidate = 3600

import { getFeaturedWorkflows } from '@/lib/queries/workflows'
import { getRoles } from '@/lib/queries/roles'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { FeaturedWorkflows } from '@/components/sections/featured-workflows'
import { RoleGrid } from '@/components/sections/role-grid'
import { CTASection } from '@/components/sections/cta-section'
import { NewsletterCTA } from '@/components/sections/newsletter-cta'
import { websiteSchema, jsonLdScriptProps } from '@/lib/schema'

export default async function HomePage() {
  const [featuredWorkflows, roles] = await Promise.all([
    getFeaturedWorkflows(),
    getRoles(),
  ])

  return (
    <>
      <script {...jsonLdScriptProps(websiteSchema())} />
      <Hero />
      <StatsBar />
      <FeaturedWorkflows workflows={featuredWorkflows} />
      <RoleGrid roles={roles} />
      <NewsletterCTA />
      <CTASection />
    </>
  )
}
