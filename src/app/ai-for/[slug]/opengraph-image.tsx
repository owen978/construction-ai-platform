import { getRoleBySlug, getRoleSlugs } from '@/lib/queries/roles'
import { getTaskBySlug, getTaskSlugs } from '@/lib/queries/tasks'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image'

export const revalidate = 3600
export const alt = 'BuildCopilot: AI workflows for construction roles and tasks'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

// Prerender one image per page at build, like the page itself.
export async function generateStaticParams() {
  const [roles, tasks] = await Promise.all([getRoleSlugs(), getTaskSlugs()])
  return [...roles, ...tasks].map(({ slug }) => ({ slug }))
}

// /ai-for/[slug] serves both roles and tasks, matching the page's lookup order.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const role = await getRoleBySlug(slug)
  const task = role ? null : await getTaskBySlug(slug)
  const name = role?.name ?? task?.name

  return renderOgImage({
    kicker: role ? 'AI for your role' : 'AI for this task',
    title: name ? `AI for ${name}` : 'AI for construction roles',
    chips: ['Free prompts', 'Workflows'],
  })
}
