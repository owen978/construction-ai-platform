import Link from 'next/link'
import { cn, truncate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import type { Template } from '@/types'

interface TemplateCardProps {
  template: Pick<Template, 'name' | 'slug' | 'description' | 'icon' | 'primary_keyword'>
  className?: string
}

export function TemplateCard({ template, className }: TemplateCardProps) {
  const { name, slug, description, icon, primary_keyword } = template

  return (
    <Link href={`/templates/${slug}`} className={cn('group', className)}>
      <Card className="h-full border-l-4 border-l-transparent transition-all duration-300 hover:border-l-primary hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-2xl">
            {icon || '\uD83D\uDCC4'}
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          {description && (
            <CardDescription className="mt-2 leading-relaxed">
              {truncate(description, 120)}
            </CardDescription>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="success">Free Template</Badge>
            {primary_keyword && (
              <Badge variant="info">{primary_keyword}</Badge>
            )}
          </div>
          <span className="mt-auto pt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            View template &rarr;
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
