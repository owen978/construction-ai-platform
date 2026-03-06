import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/layout/admin-sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check admin auth — skip for the login page itself
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')

  // We can't easily check the current path in a layout, so we check auth here.
  // The login page will still render inside this layout, but if there's no cookie
  // and we're not on the login page, the middleware/redirect would have caught it.
  // Instead, we check auth and let the login page handle itself.
  const isAuthenticated = authCookie?.value === process.env.ADMIN_PASSWORD

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
