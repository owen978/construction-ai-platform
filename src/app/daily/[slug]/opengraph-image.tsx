import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image'
import { isDailyIdeasEnabled } from '@/lib/features'
import {
  formatIdeaDate,
  getIdeaByParam,
  getPublishedIdeas,
  ideaParam,
  roleLabel,
  timeSavedLabel,
} from '@/lib/daily-ideas'

export const revalidate = 3600
export const alt = 'BuildCopilot: construction AI workflow of the day'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export async function generateStaticParams() {
  if (!isDailyIdeasEnabled()) return []
  return getPublishedIdeas().map((idea) => ({ slug: ideaParam(idea) }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const idea = getIdeaByParam(slug)
  const time = idea ? timeSavedLabel(idea) : null

  return renderOgImage({
    kicker: idea ? `Workflow of the day · ${formatIdeaDate(idea.publishDate)}` : 'Workflow of the day',
    title: idea?.title ?? 'Construction AI workflow of the day',
    chips: idea ? [roleLabel(idea.roles[0]), ...(time ? [`${time} typical`] : [])] : [],
  })
}
