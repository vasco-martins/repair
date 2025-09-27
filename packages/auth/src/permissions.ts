import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionByRole> = {
  ADMIN: (user, { can, cannot }) => {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', { ownerId: user.id })
  },
  MEMBER: (_, { can }) => {
    can('get', 'User')
  },
  BILLING: (_, { can }) => {
    can('manage', 'Billing')
  },
}
