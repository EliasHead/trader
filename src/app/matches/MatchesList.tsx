'use client'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useQuery } from '@tanstack/react-query'
import { getMatches } from './page'

export default function MatchesList() {
  const {
    isPending,
    error,
    data: matches = [],
  } = useQuery({
    queryKey: ['matches'],
    queryFn: getMatches,
  })
  console.log(matches)

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return <DataTable columns={columns} data={matches} />
}
