'use client'

import { useQueryClientInstance } from '@/context/query-client-context-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

export const ReactQueryClientProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { queryClient } = useQueryClientInstance()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
