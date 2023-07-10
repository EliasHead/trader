'use client'
import { useMemo, useState } from 'react'
import { Competition } from '@prisma/client'
import UpdateCompetition from './updateCompetition'
import DeleteCompetition from './deleteCompetition'

export default function SearchCompetition({
  competitions,
}: {
  competitions: Competition[]
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const competitionsFilter = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase()

    return competitions.filter((competition) =>
      competition.competition_name.toLowerCase().includes(lowerSearch),
    )
  }, [competitions, searchQuery])

  return (
    <>
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="flex:1 bg-zinc800 w-2/3 px-5 py-1 text-zinc-900 sm:py-3"
        placeholder="Pesquisar campeonato"
      />
      <div>
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Competição
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {competitionsFilter.map((competition) => {
                return (
                  <tr
                    key={competition.competition_id}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">{competition.competition_id}</td>
                    <td className="px-6 py-4">
                      {competition.competition_name}
                    </td>
                    <td className="flex justify-center space-x-1 px-6 py-4">
                      <UpdateCompetition competition={competition} />
                      <DeleteCompetition competition={competition} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
