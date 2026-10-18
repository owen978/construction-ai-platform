import type { ContentCounts } from '@/lib/queries/counts'

/** Live counts only: every figure here comes from the published content. */
export function StatsBar({ counts }: { counts: ContentCounts }) {
  const stats = [
    { value: counts.workflows, label: 'AI Workflows' },
    { value: counts.templates, label: 'Free Templates' },
    { value: counts.guides, label: 'Practical Guides' },
    { value: counts.roles, label: 'Construction Roles' },
  ].filter((s) => s.value > 0)

  if (stats.length === 0) return null

  return (
    <section className="border-y border-slate-200/60 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-slate-900 sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
