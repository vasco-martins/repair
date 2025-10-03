import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function getOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              organization: z.object({
                id: z.uuid(),
                name: z.string(),
                slug: z.string(),
                domain: z.string().nullish(),
                shouldAttachUsersByDomain: z.boolean(),
                avatarUrl: z.string().nullish(),
                createdAt: z.date(),
                updatedAt: z.date(),
                ownerId: z.uuid(),
                organizationId: z.uuid(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const { organization } = await request.getUserMembership(slug)

        return reply.status(200).send({
          organization: {
            id: organization.id,
            name: organization.name,
            slug: organization.slug,
            domain: organization.domain,
            shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
            avatarUrl: organization.avatarUrl,
            createdAt: organization.createdAt,
            updatedAt: organization.updatedAt,
            ownerId: organization.ownerId,
            organizationId: organization.id,
          },
        })
      },
    )
}
