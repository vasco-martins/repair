'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z.email('O email é obrigatório'),
  password: z
    .string()
    .min(8, 'A palavra-passe deve conter pelo menos 8 caracteres'),
})
export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <>
      <Head>
        <title>Login - Repair</title>
      </Head>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Introduza o seu email" />
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage>
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
              </FormItem>
              <FormItem>
                <FormLabel>Palavra-passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Insira a sua palavra-passe"
                  />
                </FormControl>
                {form.formState.errors.password && (
                  <FormMessage>
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
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
