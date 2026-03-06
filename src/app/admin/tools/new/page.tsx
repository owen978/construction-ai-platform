import { createTool } from '@/lib/actions/tools'
import { requireAdmin } from '@/lib/auth'

export default async function NewToolPage() {
  await requireAdmin()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">New Tool</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <form action={createTool} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Name *</label>
            <input id="name" name="name" type="text" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <textarea id="description" name="description" rows={3} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="long_description" className="mb-1 block text-sm font-medium text-slate-700">Long Description</label>
            <textarea id="long_description" name="long_description" rows={5} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="url" className="mb-1 block text-sm font-medium text-slate-700">URL</label>
            <input id="url" name="url" type="url" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">Category</label>
              <input id="category" name="category" type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="pricing" className="mb-1 block text-sm font-medium text-slate-700">Pricing</label>
              <input id="pricing" name="pricing" type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
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

          <div className="flex items-center gap-2">
            <input id="featured" name="featured" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="featured" className="text-sm font-medium text-slate-700">Featured</label>
          </div>

          <button type="submit" className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Create Tool
          </button>
        </form>
      </div>
    </div>
  )
}
