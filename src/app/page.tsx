// 10 minutes, so the workflow of the day switches soon after midnight (London) without a deploy.
export const revalidate = 600

import { getFeaturedWorkflows } from '@/lib/queries/workflows'
import { getRoles } from '@/lib/queries/roles'
import { getLatestGuides } from '@/lib/queries/guides'
import { getTemplates } from '@/lib/queries/templates'
import { getContentCounts } from '@/lib/queries/counts'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { FeaturedWorkflows } from '@/components/sections/featured-workflows'
import { FeaturedTemplates } from '@/components/sections/featured-templates'
import { RoleGrid } from '@/components/sections/role-grid'
import { LatestGuides } from '@/components/sections/latest-guides'
import { CTASection } from '@/components/sections/cta-section'
import { NewsletterCTA } from '@/components/sections/newsletter-cta'
import { websiteSchema, jsonLdScriptProps } from '@/lib/schema'
import { DailyIdeaCard } from '@/components/daily/daily-idea-card'
import { isDailyIdeasEnabled } from '@/lib/features'
import { getIdeaOfTheDay, getRecentIdeas, londonDate } from '@/lib/daily-ideas'
import type { Metadata } from 'next'
import { FEED_ALTERNATE } from '@/lib/metadata'

// Title and Open Graph tags come from the root layout, which already describes
// the homepage; only the canonical URL is added here.
export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    types: FEED_ALTERNATE,
  },
}

/** Flagship guides that must always be surfaced from the homepage. */
const HOMEPAGE_GUIDE_SLUGS = [
  'what-is-a-rams-construction-guide',
  'ai-for-quantity-surveyors-guide',
  'construction-cost-plan-guide',
  'ai-tender-analysis-guide',
]

export default async function HomePage() {
  const [featuredWorkflows, roles, latestGuides, templates, counts] = await Promise.all([
    getFeaturedWorkflows(),
    getRoles(),
    getLatestGuides(6, HOMEPAGE_GUIDE_SLUGS),
    getTemplates(),
    getContentCounts(),
  ])

  const today = londonDate()
  const ideaOfTheDay = isDailyIdeasEnabled() ? getIdeaOfTheDay(today) : null

  return (
    <>
      <script {...jsonLdScriptProps(websiteSchema())} />
      <Hero idea={ideaOfTheDay?.idea} rotated={ideaOfTheDay?.rotated} />
      {ideaOfTheDay && (
        <DailyIdeaCard
          idea={ideaOfTheDay.idea}
          rotated={ideaOfTheDay.rotated}
          today={today}
          more={getRecentIdeas(ideaOfTheDay.idea.slug, 3, today)}
        />
      )}
      <StatsBar counts={counts} />
      <FeaturedWorkflows workflows={featuredWorkflows} />
      <FeaturedTemplates templates={templates} />
      <RoleGrid roles={roles} />
      <LatestGuides guides={latestGuides} />
      <CTASection />
      <NewsletterCTA />
    </>
  )
}
