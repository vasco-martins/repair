import { defineAbilityFor } from '@repair/auth'

const ability = defineAbilityFor({
  id: '1',
  role: 'MEMBER',
})

console.log(ability.can('get', 'User'))
