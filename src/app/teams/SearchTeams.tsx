'use client'
import { ChangeEvent, useMemo, useState } from 'react'
import { Teams } from '@prisma/client'
import UpdateTeams from './updateTeams'
import DeleteTeam from './deleteTeam'
import Pagination from '@/components/pagination/pagination'
import AddTeams from './addTeams'

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
    <div className="text-sm">
      <div className="mb-2 flex justify-around">
        <AddTeams teams={teams} />
        <input
          value={searchQuery}
          onChange={handleFiltersChange}
          className="flex:1 bg-zinc800 w-2/3 px-4 py-1 text-zinc-900 sm:py-3"
          placeholder="Pesquisar time"
        />
      </div>

      <div>
        {paginatedItems.map((team) => {
          return (
            <div
              className="flex items-center gap-1 rounded p-2 shadow-lg sm:m-auto sm:px-8"
              key={team.team_id}
            >
              <div className="px-2 py-1">{team.team_id}</div>
              <div className="flex-1">{team.team_name}</div>
              <div className="flex items-center gap-1">
                <UpdateTeams team={team} />
                <DeleteTeam team={team} />
              </div>
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
      </div>
    </div>
  )
}
