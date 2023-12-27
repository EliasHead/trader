'use client'
import { formatDate } from '@/utils/dateUtils'
import DeleteMatch from './deleteMatches'
import { Competition, Teams } from '@prisma/client'
import UpdateMatch from './updateMtaches'
import { useState } from 'react'
import Pagination from '@/components/pagination/pagination'
import { techBadgeAnimation } from '@/lib/animations'
import { TechBadge } from '@/components/tech-badge'

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
    goal: string | null
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

type Tickets = {
  ticketId: number
  result: string | null
}

type MatchesProps = {
  competitions: Competition[]
  teams: Teams[]
  rounds: roundsType[]
  matches: Match[]
  results: Results[]
  tickets: Tickets[]
}

export default function MatchesList({
  matches,
  teams,
  competitions,
  rounds,
  results,
  tickets,
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
    <div className="m-auto w-full text-zinc-900 sm:w-1/2">
      <div className="flex items-center rounded-t-lg bg-zinc-100">
        <div className="flex px-4 py-3">
          <span className="text-left text-base font-semibold">
            Lista de Jogos
          </span>
        </div>
      </div>
      {paginatedItems?.map((match) => {
        return (
          <div
            className="grid w-full items-center justify-center border border-zinc-200 bg-zinc-100 sm:grid-cols-2"
            key={match.match_id}
          >
            <div className="grid grid-cols-app items-center justify-center self-center">
              <div className="flex items-center justify-start px-3 py-2">
                <span className="text-xs">{formatDate(match.match_date)}</span>
              </div>
              <div className="flex-1 justify-start truncate px-3 py-2">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm">
                  {match.home_team.team_name}
                </div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm">
                  {match.visitor_team.team_name}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center px-3 py-2">
                <div className="text-xs">{match.home_goals}</div>
                <div className="text-xs">{match.visitor_goals}</div>
              </div>
              <UpdateMatch
                match={match}
                competitions={competitions}
                teams={teams}
                rounds={rounds}
                results={results}
                tickets={tickets}
              />
            </div>
            <div className="grid grid-cols-app items-center justify-center">
              <div className="flex items-center justify-start px-3 py-2">
                <span
                  className={`rounded px-1 text-xs font-bold uppercase text-white ${
                    match.result === 'red'
                      ? 'bg-red-600'
                      : match.result === 'green'
                      ? 'bg-green-600'
                      : match.result === 'green'
                      ? 'bg-yellow-400'
                      : 'bg-sky-600'
                  }`}
                >
                  {match.result}
                </span>
              </div>
              <div className="flex items-center justify-start px-3 py-2">
                {match.strategy?.split(',').map((str, i) => {
                  return (
                    <TechBadge
                      key={`id-${str}`}
                      name={str}
                      color='text-white'
                      {...techBadgeAnimation}
                      transition={{ duration: 0.2, delay: i * 0.1 }}
                    />
                    // <span
                    //   className="mr-2 rounded bg-orange-500 px-1 text-xs font-bold uppercase text-cyan-50"
                    //   key={i}
                    // >
                    //   {i}
                    // </span>
                  )
                })}
              </div>
              <div className="flex flex-wrap items-center justify-start px-3 py-2">
                {match.review?.split(',').map((i) => {
                  return (
                    <span
                      className={` mr-2 mt-1 whitespace-nowrap rounded px-1 text-xs font-bold uppercase text-white ${
                        i === 'race' ||
                        i === 'home' ||
                        i === 'must-win' ||
                        i === '+goal'
                          ? 'bg-green-700'
                          : i === 'live'
                          ? 'bg-black'
                          : i === 'cycles'
                          ? 'bg-blue-600'
                          : 'bg-red-600'
                      }`}
                      key={i}
                    >
                      {i}
                    </span>
                  )
                })}
                {/* <span className="text-xs">{match.review}</span> */}
              </div>
              <DeleteMatch match={match} />
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
  )
}
