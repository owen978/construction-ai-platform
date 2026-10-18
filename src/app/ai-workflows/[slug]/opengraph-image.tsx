import { getWorkflowBySlug, getWorkflowSlugs } from '@/lib/queries/workflows'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image'

export const revalidate = 3600
export const alt = 'BuildCopilot: free AI prompt for construction'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

// Prerender one image per page at build, like the page itself.
export async function generateStaticParams() {
  const slugs = await getWorkflowSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const workflow = await getWorkflowBySlug(slug)

  return renderOgImage({
    kicker: 'Free AI prompt',
    title: workflow?.title ?? 'AI workflows for construction',
    chips: [workflow?.role?.name, workflow?.task?.name].filter((c): c is string => Boolean(c)),
  })
}
