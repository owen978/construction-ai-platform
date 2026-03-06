'use client'

import { useTransition } from 'react'

interface DeleteButtonProps {
  id: string
  action: (id: string) => Promise<void>
}

export function DeleteButton({ id, action }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm('Are you sure you want to delete this item?')) return

    startTransition(async () => {
      await action(id)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
