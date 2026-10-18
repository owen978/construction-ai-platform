import { getTemplateBySlug, getTemplateSlugs } from '@/lib/queries/templates'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image'

export const revalidate = 3600
export const alt = 'BuildCopilot: free construction template'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

// Prerender one image per page at build, like the page itself.
export async function generateStaticParams() {
  const slugs = await getTemplateSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const template = await getTemplateBySlug(slug)

  return renderOgImage({
    kicker: 'Free template',
    title: template?.name ?? 'Free construction templates',
    chips: ['UK construction', 'AI-assisted'],
  })
}
