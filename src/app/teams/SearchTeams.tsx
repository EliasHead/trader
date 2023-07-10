'use client'
import { useMemo, useState } from 'react'
import { Teams } from '@prisma/client'
import UpdateTeams from './updateTeams'
import DeleteTeam from './deleteTeam'

export default function SearchTeams({ teams }: { teams: Teams[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const teamsFilter = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase()

    return teams.filter((team) =>
      team.team_name.toLowerCase().includes(lowerSearch),
    )
  }, [teams, searchQuery])

  return (
    <>
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="flex:1 bg-zinc800 w-2/3 px-5 py-1 text-zinc-900 sm:py-3"
        placeholder="Pesquisar time"
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
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {teamsFilter.map((team) => {
                return (
                  <tr
                    key={team.team_id}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">{team.team_id}</td>
                    <td className="px-6 py-4">{team.team_name}</td>
                    <td className="flex justify-center space-x-1 px-6 py-4">
                      <UpdateTeams team={team} />
                      <DeleteTeam team={team} />
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
