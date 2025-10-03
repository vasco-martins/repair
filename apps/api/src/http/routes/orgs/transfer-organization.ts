import { organizationSchema } from '@repair/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma.'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function transferOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/organizations/:slug/owner',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Transfer an organization',
          security: [
            {
              bearerAuth: [],
            },
          ],
          body: z.object({
            transferUserId: z.uuid(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authOrganization = organizationSchema.parse({
          id: organization.id,
          ownerId: organization.ownerId,
        })

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('transfer_ownership', authOrganization)) {
          throw new UnauthorizedError(
            'Você não tem permissão para transferir esta organização',
          )
        }

        const { transferUserId } = request.body

        const transferToOwnership = await prisma.member.findUnique({
          where: {
            userId_organizationId: {
              userId: transferUserId,
              organizationId: organization.id,
            },
          },
        })

        if (!transferToOwnership) {
          throw new BadRequestError(
            'O utilizador não está associado a esta organização',
          )
        }

        await prisma.$transaction([
          prisma.member.update({
            where: {
              userId_organizationId: {
                userId: transferUserId,
                organizationId: organization.id,
              },
            },
            data: {
              role: 'ADMIN',
            },
          }),

          prisma.organization.update({
            where: { id: organization.id },
            data: {
              ownerId: transferUserId,
            },
          }),
        ])

        return reply.status(204).send()
      },
    )
}
