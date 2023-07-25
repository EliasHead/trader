'use client'
import { ChangeEvent, useMemo, useState } from 'react'
import { Competition } from '@prisma/client'
import UpdateCompetition from './updateCompetition'
import DeleteCompetition from './deleteCompetition'
import Pagination from '@/components/pagination/pagination'
import AddCompetitions from './addCompetitions'

export default function SearchCompetition({
  competitions,
}: {
  competitions: Competition[]
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const competitionsFilter = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase()

    return competitions.filter((competition) =>
      competition.competition_name.toLowerCase().includes(lowerSearch),
    )
  }, [competitions, searchQuery])

  const totalPages = Math.ceil(competitionsFilter.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedItems = competitionsFilter.slice(startIndex, endIndex)

  const handleFiltersChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setSearchQuery(event.target.value)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="text-sm">
      <div className="mb-2 flex justify-around">
        <AddCompetitions competitions={competitions} />
        <input
          value={searchQuery}
          onChange={handleFiltersChange}
          className="bg-zinc800 w-[45%] px-2 py-1 text-zinc-900 sm:py-3"
          placeholder="Pesquisar campeonato"
        />
      </div>

      <div>
        {paginatedItems.map((competition) => {
          return (
            <div
              className="flex items-center gap-1 rounded p-2 shadow-lg sm:m-auto sm:px-8"
              key={competition.competition_id}
            >
              <div className="px-2 py-1">{competition.competition_id}</div>
              <div className="flex-1">{competition.competition_name}</div>
              <div className="flex items-center gap-1">
                <UpdateCompetition competition={competition} />
                <DeleteCompetition competition={competition} />
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
