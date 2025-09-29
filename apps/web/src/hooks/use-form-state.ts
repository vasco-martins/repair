import { FormEvent, useState, useTransition } from 'react'

type FormState = {
  success: boolean
  message: string | null
  errors: Record<string, { errors: string[] }> | null
}
export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  const [isPending, startTransition] = useTransition()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success === true && onSuccess) {
        await onSuccess()
      }

      setFormState(state as FormState)
    })
  }
  return [formState, handleSubmit, isPending] as const
}
