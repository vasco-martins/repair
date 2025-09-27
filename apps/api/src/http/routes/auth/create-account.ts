import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: z.object({
          email: z.email(),
          name: z.string().min(6),
          password: z.string().min(8),
        }),
      },
    },
    () => {
      return 'User created!'
    },
  )
}
