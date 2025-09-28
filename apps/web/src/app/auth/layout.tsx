export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-6 flex flex-col gap-2 text-center">
        <h1 className="text-3xl leading-10 font-bold">Repair</h1>
        <p>Gestão de reparações de eletrodomésticos</p>
      </div>
      {children}
    </div>
  )
}
