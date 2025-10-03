import type { CreateAbility, MongoAbility } from '@casl/ability'
import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { z } from 'zod'

import type { User } from './models/user'
import { permissions } from './permissions'
import { billingSubject } from './subjects/billing'
import { inviteSubject } from './subjects/invite'
import { organizationSubject } from './subjects/organization'
import { userSubject } from './subjects/user'

export * from './models/organization'
export * from './models/user'
export * from './roles'

const appAbilitiesSchema = z.union([
  billingSubject,
  organizationSubject,
  userSubject,
  inviteSubject,

  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permission for role ${user.role} is not found.`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return '__typename' in subject ? subject.__typename : 'User'
    },
  })

  return ability
}
