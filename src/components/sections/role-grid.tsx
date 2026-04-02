import { RoleCard } from '@/components/cards/role-card'
import type { Role } from '@/types'

interface RoleGridProps {
  roles: Role[]
}

export function RoleGrid({ roles }: RoleGridProps) {
  if (roles.length === 0) return null

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Built for Your Role</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">AI for Every Construction Role</h2>
          <p className="mt-4 text-lg text-slate-600">Whether you&apos;re a QS, PM, or Site Manager — find AI workflows tailored to your daily work.</p>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </div>
    </section>
  )
}
