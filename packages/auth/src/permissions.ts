import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from './index'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionByRole> = {
  ADMIN: () => {},
  MEMBER: () => {},
}
