import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { updateGuide } from '@/lib/actions/guides'
import type { Guide } from '@/types'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

interface EditGuidePageProps {
  params: Promise<{ id: string }>
}

export default async function EditGuidePage({ params }: EditGuidePageProps) {
  await requireAdmin()
  const { id } = await params
  const supabase = createAdminClient()

  const { data } = await supabase.from('guides').select('*').eq('id', id).single()
  const guide = data as Guide | null

  if (!guide) {
    notFound()
  }

  const updateWithId = updateGuide.bind(null, guide.id)

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit Guide</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <form action={updateWithId} className="space-y-6">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
            <input id="title" name="title" type="text" required defaultValue={guide.title} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <textarea id="description" name="description" rows={3} defaultValue={guide.description ?? ''} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="content" className="mb-1 block text-sm font-medium text-slate-700">Content</label>
            <textarea id="content" name="content" rows={12} defaultValue={guide.content ?? ''} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="difficulty" className="mb-1 block text-sm font-medium text-slate-700">Difficulty</label>
              <select id="difficulty" name="difficulty" defaultValue={guide.difficulty} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label htmlFor="reading_time_minutes" className="mb-1 block text-sm font-medium text-slate-700">Reading Time (min)</label>
              <input id="reading_time_minutes" name="reading_time_minutes" type="number" min="1" defaultValue={guide.reading_time_minutes ?? ''} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select id="status" name="status" defaultValue={guide.status} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input id="featured" name="featured" type="checkbox" defaultChecked={guide.featured} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="featured" className="text-sm font-medium text-slate-700">Featured</label>
          </div>

          <button type="submit" className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Update Guide
          </button>
        </form>
      </div>
    </div>
  )
}
