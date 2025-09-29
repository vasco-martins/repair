import { auth } from '@/auth/auth'

export default async function Home() {
  const profile = await auth()

  return (
    <div>
      <h1>Hello {profile.email}</h1>
    </div>
  )
}
