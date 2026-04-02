import Link from 'next/link'
import Image from 'next/image'
import { cn, truncate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import type { Tool } from '@/types'

interface ToolCardProps {
  tool: Pick<Tool, 'name' | 'slug' | 'description' | 'category' | 'pricing' | 'logo_url'>
  className?: string
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const { name, slug, description, category, pricing, logo_url } = tool

  return (
    <Link href={`/ai-tools/${slug}`} className={cn('group', className)}>
      <Card className="h-full border-l-4 border-l-transparent transition-all duration-300 hover:border-l-primary hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex items-center gap-3">
            {logo_url ? (
              <Image
                src={logo_url}
                alt={`${name} logo`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-contain"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
            )}
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
            {category && <Badge variant="info">{category}</Badge>}
            {pricing && <Badge variant="secondary">{pricing}</Badge>}
          </div>
          <span className="mt-auto pt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more &rarr;
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
