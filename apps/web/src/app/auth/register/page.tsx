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

const formSchema = z
  .object({
    name: z.string().min(6, 'O nome deve conter pelo menos 6 caracteres'),
    email: z.email('O email é obrigatório'),
    password: z
      .string()
      .min(8, 'A palavra-passe deve conter pelo menos 8 caracteres'),
    confirmPassword: z
      .string()
      .min(8, 'A palavra-passe deve conter pelo menos 8 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As palavras-passe não coincidem',
  })
export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <>
      <Head>
        <title>Register - Repair</title>
      </Head>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...form.register('name')}
                    name="name"
                    type="name"
                    placeholder="Introduza o seu nome"
                  />
                </FormControl>
                {form.formState.errors.name && (
                  <FormMessage>
                    {form.formState.errors.name.message}
                  </FormMessage>
                )}
              </FormItem>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...form.register('email')}
                    name="email"
                    type="email"
                    placeholder="Introduza o seu email"
                  />
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
                    {...form.register('password')}
                    name="password"
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
              <FormItem>
                <FormLabel>Confirmar palavra-passe</FormLabel>
                <FormControl>
                  <Input
                    {...form.register('confirmPassword')}
                    name="confirmPassword"
                    type="password"
                    placeholder="Insira a sua palavra-passe"
                  />
                </FormControl>
                {form.formState.errors.confirmPassword && (
                  <FormMessage>
                    {form.formState.errors.confirmPassword.message}
                  </FormMessage>
                )}
              </FormItem>
              <Button type="submit" className="w-full">
                Registar
              </Button>
            </form>
          </Form>
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
