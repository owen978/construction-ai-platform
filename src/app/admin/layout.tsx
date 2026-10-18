import type { Metadata } from 'next'
import { isAdmin } from '@/lib/auth'
import { AdminSidebar } from '@/components/layout/admin-sidebar'

// Keep the CMS (including /admin/login) out of search results.
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Every admin page except /admin/login calls requireAdmin() itself.
  const isAuthenticated = await isAdmin()

  if (!isAuthenticated) {
    // If not authenticated, only show children (which will be the login page)
    // The login page is the only admin page accessible without auth
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        {children}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto bg-slate-50 p-8">
        {children}
      </div>
    </div>
  )
}
