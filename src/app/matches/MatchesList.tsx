'use client'
import { formatDate } from '@/utils/dateUtils'
import DeleteMatch from './deleteMatches'
import { Competition, Teams } from '@prisma/client'
import UpdateMatch from './updateMtaches'
import { useState } from 'react'
import Pagination from '@/components/pagination/pagination'

type Match = {
  match_id: number
  match_date: Date
  home_goals: number
  visitor_goals: number
  odd: number | null
  strategy: string | null
  result: string | null
  review: string | null
  stake: number | null
  round: number
  leverage: {
    description: string | null
  } | null
  leverageId?: number | null
  competition: {
    competition_name: string
  } | null
  competititon_id?: number
  home_team: {
    team_name: string
  }
  home_team_id: number
  visitor_team: {
    team_name: string
  }
  visitor_team_id: number
  ticket: {
    result: string | null
  } | null
  ticketId?: number | null
}

type roundsType = {
  round_id: number
  round_name: number | string
}

type Results = {
  result_id: number
  label: string
}

type MatchesProps = {
  competitions: Competition[]
  teams: Teams[]
  rounds: roundsType[]
  matches: Match[]
  results: Results[]
}

export default function MatchesList({
  matches,
  teams,
  competitions,
  rounds,
  results,
}: MatchesProps) {
  // TODO: melhorar paginação
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const totalPages = Math.ceil(matches.length / itemsPerPage)
  // setData(2)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedItems = matches.slice(startIndex, endIndex)

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
    // TODO: concertar margem da tabela
    <div className="flex w-[90%] flex-col items-center">
      <div className="hidden overflow-auto rounded-lg bg-white shadow md:inline-block">
        <table className="min-w-full text-gray-900 dark:text-gray-400 md:w-full">
          <thead className="border-b dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium"
              >
                data
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium"
              >
                Home
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium"
              >
                -
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium"
              >
                Visitante
              </th>
              <th
                scope="col"
                className="px-6 py-2 text-left text-sm font-medium"
              >
                resultado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium"
              >
                Estrategia
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium"
              >
                Revisão
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-900"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems?.map((match) => {
              return (
                <tr
                  className="border-b dark:border-gray-700 dark:bg-gray-800"
                  key={match.match_id}
                >
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-medium">
                    {match.match_id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-medium">
                    {formatDate(match.match_date)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-light">
                    {match.home_team.team_name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-light">
                    {match.home_goals}
                    <span> x </span>
                    {match.visitor_goals}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-light">
                    {match.visitor_team.team_name}
                  </td>
                  <td
                    className={`whitespace-nowrap px-6 py-3 text-center text-sm text-white `}
                  >
                    <span
                      className={`rounded px-3 py-1 text-xs font-bold uppercase ${
                        match.result === 'red'
                          ? 'bg-red-600'
                          : match.result === 'green'
                          ? 'bg-green-600'
                          : match.result === 'draw'
                          ? 'bg-yellow-400'
                          : 'bg-sky-600'
                      }`}
                    >
                      {match.result}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-light">
                    {match.strategy?.split(',').map((i) => {
                      return (
                        <span
                          className="mr-2 rounded bg-orange-500 px-3 py-1 text-xs font-bold uppercase text-cyan-50"
                          key={i}
                        >
                          {i}
                        </span>
                      )
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-light">
                    {match.review?.split(',').map((i) => {
                      return (
                        <span
                          className={`mr-2 rounded px-3 py-1 text-xs font-bold uppercase text-white ${
                            i === 'race' || i === 'home' || i === 'must-win'
                              ? 'bg-green-700'
                              : 'bg-red-600'
                          }`}
                          key={i}
                        >
                          {i}
                        </span>
                      )
                    })}
                  </td>
                  <td className="flex justify-center space-x-1 px-6 py-3">
                    <UpdateMatch
                      match={match}
                      competitions={competitions}
                      teams={teams}
                      rounds={rounds}
                      results={results}
                    />
                    <DeleteMatch match={match} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {matches.map((match) => {
          return (
            <div
              key={match.match_id}
              className="space-y-3 rounded-lg bg-zinc-200 p-4 font-semibold  shadow-lg"
            >
              <div className="flex items-center space-x-2 text-sm">
                <span>Data:</span>
                <div>{formatDate(match.match_date)}</div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div>{match.home_team.team_name}</div>
                <div>
                  {match.home_goals}
                  <span> x </span>
                  {match.visitor_goals}
                </div>
                <div>{match.visitor_team.team_name}</div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span>Reasultado:</span>
                <div
                  style={{
                    backgroundColor: match.result === 'red' ? 'red' : 'green',
                    padding: '0 8px',
                    borderRadius: '4px',
                    color: 'white',
                  }}
                >
                  {match.result}
                </div>
              </div>
            </div>
          )
        })}
      </div>
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
  )
}
