import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const body = await request.json()
  const { password } = body

  if (!password) {
    return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('admin-auth', password, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  })

  return NextResponse.json({ success: true })
}
