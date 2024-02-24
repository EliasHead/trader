'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getTeams } from './page'
import { columns } from './columns'
import { DataTable } from './data-table'

export default function ListTeams() {
  const {
    isPending,
    error,
    data: teams = [],
  } = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return <DataTable columns={columns} data={teams} />
}
