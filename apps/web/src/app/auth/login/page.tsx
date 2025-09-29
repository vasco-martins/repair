'use client'

import { AlertTriangle } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { useActionState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { SignInWithEmailAndPassword } from './actions'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    SignInWithEmailAndPassword,
    { success: false, message: null, errors: null },
  )
  return (
    <>
      <Head>
        <title>Login - Repair</title>
      </Head>
      {state.success === false && state.message && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao iniciar sessão</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <h1 className="text-2xl font-bold">Acesso à Plataforma</h1>
            <p className="text-muted-foreground text-sm">
              Inicie sessão para continuar
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Introduza o seu email"
            />
            {state.errors?.email && (
              <p className="text-destructive text-sm">
                {state.errors.email.errors[0]}
              </p>
            )}
            <Label>Palavra-passe</Label>
            <Input
              type="password"
              name="password"
              placeholder="Insira a sua palavra-passe"
            />
            {state.errors?.password && (
              <p className="text-destructive text-sm">
                {state.errors.password.errors[0]}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              Entrar
            </Button>
          </form>
          <div className="mt-4 flex justify-center">
            <Link
              href="/auth/register"
              className="text-muted-foreground text-sm"
            >
              Não tem uma conta? Registe-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
