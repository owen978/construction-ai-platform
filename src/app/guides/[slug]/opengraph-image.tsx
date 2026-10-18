import { getGuideBySlug, getGuideSlugs } from '@/lib/queries/guides'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image'

export const revalidate = 3600
export const alt = 'BuildCopilot guide for construction professionals'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

// Prerender one image per page at build, like the page itself.
export async function generateStaticParams() {
  const slugs = await getGuideSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  return renderOgImage({
    kicker: 'Guide',
    title: guide?.title ?? 'Construction AI guides',
    chips: guide?.reading_time_minutes ? [`${guide.reading_time_minutes} min read`] : [],
  })
}
