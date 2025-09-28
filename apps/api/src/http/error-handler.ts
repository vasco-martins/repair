import { FastifyInstance } from 'fastify'
import { z, ZodError } from 'zod'

import { BadRequestError } from './routes/_errors/bad-request-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: z.treeifyError(error),
    })
  }
  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }
  console.log(error)

  // send error to some observability tool

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
