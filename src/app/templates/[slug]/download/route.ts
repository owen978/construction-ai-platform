import { getTemplateBySlug } from '@/lib/queries/templates'
import { templateToWordHtml } from '@/lib/word-doc'
import { SITE_URL } from '@/lib/site'

/**
 * The template as an editable Word document. Reached after the download form
 * (a soft gate: the URL itself isn't secret). Kept out of search results.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const template = await getTemplateBySlug(slug)
  if (!template?.template_content) return new Response('Not found', { status: 404 })

  const html = templateToWordHtml(
    template.name,
    template.template_content,
    `Free template from BuildCopilot (${SITE_URL}/templates/${slug}). Check it against your contract, your site and current regulations before use.`
  )
  return new Response(html, {
    headers: {
      'Content-Type': 'application/msword; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}-template.doc"`,
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
