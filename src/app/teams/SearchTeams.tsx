'use client'
import { ChangeEvent, useMemo, useState } from 'react'
import { Teams } from '@prisma/client'
import UpdateTeams from './updateTeams'
import DeleteTeam from './deleteTeam'
import Pagination from '@/components/pagination/pagination'
import AddTeams from './addTeams'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-separator'

export default function SearchTeams({ teams }: { teams: Teams[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const teamsFilter = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase()

    return teams.filter((team) =>
      team.team_name.toLowerCase().includes(lowerSearch),
    )
  }, [teams, searchQuery])

  const totalPages = Math.ceil(teamsFilter.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedItems = teamsFilter.slice(startIndex, endIndex)

  const handleFiltersChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setSearchQuery(event.target.value)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Função para ir para a página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="w-full text-sm">
      <div className="grid w-full grid-cols-1 gap-4 px-2">
        <Card className="mb-2 w-full space-y-2 sm:m-auto sm:w-1/2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Times</CardTitle>
            <input
              value={searchQuery}
              onChange={handleFiltersChange}
              className="flex:1 bg-zinc800 w-2/3 px-4 py-1 text-zinc-900 sm:py-3"
              placeholder="Pesquisar time"
            />
            <AddTeams teams={teams} />
          </CardHeader>
          <CardContent className="grid gap-6">
            {paginatedItems.map((team) => {
              return (
                <div className="" key={team.team_id}>
                  <div className="grid grid-cols-6 items-center justify-between gap-1 sm:grid-cols-5">
                    <div className="col-span-1 items-center space-x-4">
                      <div>{team.team_id}</div>
                    </div>
                    <div className="col-span-3 items-center space-x-4">
                      <div>{team.team_name}</div>
                    </div>
                    <div className="col-span-1 items-center space-x-4">
                      <div>
                        <div className="flex items-center gap-1">
                          <UpdateTeams team={team} />
                          <DeleteTeam team={team} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              )
            })}
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
