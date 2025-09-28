'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ResetPasswordSuccessPage() {
  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="space-y-4 text-center">
            <div className="inline-flex h-12 flex-col items-center justify-center gap-2 overflow-hidden rounded-sm bg-slate-100 p-4">
              <Check />
            </div>
            <h1 className="text-2xl font-bold">
              Palavra-passe redefinida com sucesso
            </h1>
            <p className="text-muted-foreground text-center text-sm">
              Pode agora iniciar sessão com a sua nova palavra-passe.
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <Button className="w-full">
            <Link href="/auth/login">Iniciar sessão</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
