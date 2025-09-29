'use server'

import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authenticated = await isAuthenticated()

  if (authenticated) {
    redirect('/')
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center">
      <div className="mb-6 flex w-full flex-col gap-2 text-center">
        <h1 className="text-3xl leading-10 font-bold">Repair</h1>
        <p>Gestão de reparações de eletrodomésticos</p>
      </div>
      {children}
    </div>
  )
}
