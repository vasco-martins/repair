'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <h1 className="text-2xl font-bold">Redefinir palavra-passe</h1>
            <p className="text-muted-foreground text-sm">
              Introduza a sua nova palavra-passe
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Redefinir palavra-passe
              </Button>
            </form>
          </Form>
          <div className="mt-4 flex justify-center">
            <Link href="/auth/login" className="text-muted-foreground text-sm">
              Voltar ao inicio de sessão
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
