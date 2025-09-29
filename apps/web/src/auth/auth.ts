import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return !!token?.value
}

export async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/auth/login')
  }

  try {
    const { user } = await getProfile()

    return user
  } catch (error) {
    console.error(error)
    cookieStore.delete('token')
  }

  redirect('/auth/login')
}
