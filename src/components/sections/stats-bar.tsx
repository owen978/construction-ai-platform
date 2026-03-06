export function StatsBar() {
  const stats = [
    { value: '50+', label: 'AI Workflows' },
    { value: '6', label: 'Construction Roles' },
    { value: '100%', label: 'Free to Use' },
    { value: '5min', label: 'Average Time Saved' },
  ]

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
