import { auth } from '@/auth/auth'
import Header from '@/components/header'

export default async function Home() {
  const profile = await auth()

  return (
    <div>
      <Header />
      <h1>Hello {profile.email}</h1>
    </div>
  )
}
