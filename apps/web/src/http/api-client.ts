import { getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async (request) => {
        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')
          const token = (await cookies()).get('token')?.value
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
          return
        }

        const token = getCookie('token') as string | undefined
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
