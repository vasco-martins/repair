'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import z from 'zod'

import { SignUpWithPassword } from '@/http/sign-up-with-password'

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

export async function SignUpWithPasswordAction(
  _prevState: unknown,
  data: FormData,
) {
  const validatedFields = formSchema.safeParse(Object.fromEntries(data))

  if (!validatedFields.success) {
    const errors = z.treeifyError(validatedFields.error).properties

    return { success: false, message: null, errors }
  }

  const { name, email, password } = validatedFields.data

  try {
    await SignUpWithPassword({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    return { success: false, message: 'Erro ao criar conta', errors: null }
  }

  redirect('/auth/login')
}
