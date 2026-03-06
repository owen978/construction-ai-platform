import { createContentPost } from '@/lib/actions/content-posts'
import { requireAdmin } from '@/lib/auth'

export default async function NewContentPage() {
  await requireAdmin()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">New Content Post</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <form action={createContentPost} className="space-y-6">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
            <input id="title" name="title" type="text" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="excerpt" className="mb-1 block text-sm font-medium text-slate-700">Excerpt</label>
            <textarea id="excerpt" name="excerpt" rows={2} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="body" className="mb-1 block text-sm font-medium text-slate-700">Body</label>
            <textarea id="body" name="body" rows={10} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="platform" className="mb-1 block text-sm font-medium text-slate-700">Platform</label>
              <input id="platform" name="platform" type="text" placeholder="e.g. LinkedIn, Twitter" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="content_type" className="mb-1 block text-sm font-medium text-slate-700">Content Type</label>
              <input id="content_type" name="content_type" type="text" placeholder="e.g. blog, social, newsletter" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select id="status" name="status" defaultValue="draft" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <button type="submit" className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Create Post
          </button>
        </form>
      </div>
    </div>
  )
}
