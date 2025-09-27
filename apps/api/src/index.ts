import { defineAbilityFor } from '@repair/auth'

const ability = defineAbilityFor({ role: 'ADMIN' })

console.log(ability.can('invite', 'User'))
