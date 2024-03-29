'use client'

// import { queryClientOptions } from '@/utils/constants'
import { QueryClient } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useState } from 'react'

export const QueryClientInstanceContext = createContext<{
  queryClient: QueryClient | null
}>({
  queryClient: null,
})

export const QueryClientInstanceProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientInstanceContext.Provider value={{ queryClient }}>
      {children}
    </QueryClientInstanceContext.Provider>
  )
}

export const useQueryClientInstance = (): { queryClient: QueryClient } => {
  const { queryClient } = useContext(QueryClientInstanceContext)

  if (!queryClient) {
    throw new Error('No queryClientInstanceProvider found')
  }

  return { queryClient }
}
