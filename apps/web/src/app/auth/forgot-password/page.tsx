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

const formSchema = z.object({
  email: z.email('O email é obrigatório'),
})
export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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
            <h1 className="text-2xl font-bold">Recuperar palavra-passe</h1>
            <p className="text-muted-foreground text-sm">
              Introduza o seu email para recuperar a sua palavra-passe
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <Button type="submit" className="w-full">
                Recuperar palavra-passe
              </Button>
            </form>
          </Form>
          <div className="mt-4 flex justify-center">
            <Link href="/auth/login" className="text-muted-foreground text-sm">
              Voltar
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
