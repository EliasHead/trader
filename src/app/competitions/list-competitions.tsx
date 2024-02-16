'use client'
import { useQuery } from '@tanstack/react-query'
import { getCompetitions } from './page'
import { columns } from './columns'
import { DataTable } from './data-table'

export const ListCompetitions = () => {
  const {
    isPending,
    error,
    data: competitions = [],
  } = useQuery({
    queryKey: ['competitions'],
    queryFn: getCompetitions,
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return <DataTable columns={columns} data={competitions} />
}
