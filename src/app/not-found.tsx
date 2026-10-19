import type { Metadata } from 'next'
import Link from 'next/link'

// Without its own metadata a 404 showed the homepage title and the layout's
// "index, follow" next to Next.js's automatic noindex.
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-lg bg-orange-50 text-5xl">
        🏗️
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-lg text-slate-600">
        This page doesn&apos;t exist. It might have been moved, or you may have followed an old link.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
        >
          Back to Home
        </Link>
        <Link
          href="/ai-workflows"
          className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 transition-all"
        >
          Browse Workflows
        </Link>
      </div>
    </div>
  )
}
