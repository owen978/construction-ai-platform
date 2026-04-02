import Link from 'next/link'
import { cn, truncate } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import type { Role } from '@/types'

interface RoleCardProps {
  role: Pick<Role, 'name' | 'slug' | 'description' | 'icon'>
  className?: string
}

export function RoleCard({ role, className }: RoleCardProps) {
  const { name, slug, description, icon } = role

  return (
    <Link href={`/ai-for/${slug}`} className={cn('group', className)}>
      <Card className="h-full border-l-4 border-l-transparent transition-all duration-300 hover:border-l-primary hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-orange-50 text-3xl">
            {icon || '\uD83D\uDC64'}
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          {description && (
            <CardDescription className="mt-2 leading-relaxed">
              {truncate(description, 120)}
            </CardDescription>
          )}
          <span className="mt-auto pt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            View workflows &rarr;
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
