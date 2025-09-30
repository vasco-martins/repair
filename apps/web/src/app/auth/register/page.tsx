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

import { SignUpWithPasswordAction } from './action'

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    SignUpWithPasswordAction,
    { success: false, message: null, errors: null },
  )
  return (
    <>
      <Head>
        <title>Register - Repair</title>
      </Head>
      {state.success === false && state.message && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao criar a conta</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <h1 className="text-2xl font-bold">Acesso à Plataforma</h1>
            <p className="text-muted-foreground text-sm">
              Crie uma conta para continuar
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Label>Nome</Label>
            <Input name="name" type="name" placeholder="Introduza o seu nome" />
            {state.errors?.name && (
              <p className="text-destructive text-sm">
                {state.errors.name.errors[0]}
              </p>
            )}
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Introduza o seu email"
            />
            {state.errors?.email && (
              <p className="text-destructive text-sm">
                {state.errors.email.errors[0]}
              </p>
            )}
            <Label>Palavra-passe</Label>
            <Input
              name="password"
              type="password"
              placeholder="Insira a sua palavra-passe"
            />
            {state.errors?.password && (
              <p className="text-destructive text-sm">
                {state.errors.password.errors[0]}
              </p>
            )}
            <Label>Confirmar palavra-passe</Label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Insira a sua palavra-passe"
            />
            {state.errors?.confirmPassword && (
              <p className="text-destructive text-sm">
                {state.errors.confirmPassword.errors[0]}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              Registar
            </Button>
          </form>
          <div className="mt-4 flex justify-center">
            <Link href="/auth/login" className="text-muted-foreground text-sm">
              Já tem uma conta? Inicie sessão
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
