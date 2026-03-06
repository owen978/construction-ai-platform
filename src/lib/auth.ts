import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')

  if (authCookie?.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login')
  }
}
