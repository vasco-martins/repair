'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

import { SignInWithPassword } from '@/http/sign-in-with-password'

const formSchema = z.object({
  email: z.email('O email é obrigatório'),
  password: z
    .string()
    .min(8, 'A palavra-passe deve conter pelo menos 8 caracteres'),
})

export async function SignInWithEmailAndPassword(
  _prevState: unknown,
  data: FormData,
) {
  const validatedFields = formSchema.safeParse(Object.fromEntries(data))

  if (!validatedFields.success) {
    const errors = z.treeifyError(validatedFields.error).properties

    return { success: false, message: null, errors }
  }

  const { email, password } = validatedFields.data

  try {
    const { token } = await SignInWithPassword({
      email,
      password,
    })

    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    return { success: false, message: 'Erro ao iniciar sessão', errors: null }
  }

  redirect('/')
}
