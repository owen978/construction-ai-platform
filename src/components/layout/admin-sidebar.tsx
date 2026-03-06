'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/workflows', label: 'Workflows' },
  { href: '/admin/tools', label: 'Tools' },
  { href: '/admin/guides', label: 'Guides' },
  { href: '/admin/roles', label: 'Roles' },
  { href: '/admin/tasks', label: 'Tasks' },
  { href: '/admin/content', label: 'Content' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-900">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {adminLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <Link
          href="/"
          className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          &larr; Back to Site
        </Link>
      </div>
    </aside>
  )
}
