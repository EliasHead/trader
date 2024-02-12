'use client'

import {
  QueryClientInstanceProvider,
  useQueryClientInstance,
} from '@/context/query-client-context-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

const AppQueryClientInstanceWapper = ({
  children,
}: {
  children: ReactNode
}) => {
  const { queryClient } = useQueryClientInstance()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export const ReactQueryClientProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <QueryClientInstanceProvider>
      <AppQueryClientInstanceWapper>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </AppQueryClientInstanceWapper>
    </QueryClientInstanceProvider>
  )
}
