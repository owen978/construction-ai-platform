import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'info'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/20',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  info: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-0.5 text-xs font-medium inline-flex items-center',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
