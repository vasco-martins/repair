import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from './index'
import type { User } from './models/user'

type Role = 'ADMIN' | 'MEMBER'

type PermissionByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionByRole> = {
  ADMIN: (_, { can }) => {
    can('manage', 'all')
  },
  MEMBER: (_, { can }) => {
    can('invite', 'User')
  },
}
