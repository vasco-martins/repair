import { api } from './api-client'

interface SignUpWithPasswordRequest {
  name: string
  email: string
  password: string
}

interface SignUpWithPasswordResponse {
  token: string
}

export async function SignUpWithPassword({
  name,
  email,
  password,
}: SignUpWithPasswordRequest) {
  const result = await api
    .post('users', {
      json: {
        name,
        email,
        password,
      },
    })
    .json<SignUpWithPasswordResponse>()

  return result
}
