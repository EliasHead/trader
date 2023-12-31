'use client'
import { formatDate } from '@/utils/dateUtils'
import DeleteMatch from './deleteMatches'
import { Competition, Matches, Results, Reviews, Strategies, Teams, Tickets } from '@prisma/client'
import UpdateMatch from './updateMtaches'
import { useState } from 'react'
import Pagination from '@/components/pagination/pagination'
import { techBadgeAnimation } from '@/lib/animations'
import { Badge } from '@/components/badge'

type Match = {
  match_id: number
  match_date: Date
  home_goals: number
  visitor_goals: number
  odd: number | null
  strategy: {
    strategy_id: number;
    strategy_name: string;
  };
  result: {
    result_id: number;
    result_name: string;
  } | null;
  review: {
    review_id: number;
    review_name: string;
  } | null;
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
  // odd: number | null
}

type roundsType = {
  round_id: number
  round_name: string
}

// type Tickets = {
//   ticketId: number
//   result: string | null
// }

type MatchesProps = {
  competitions: Competition[]
  teams: Teams[]
  rounds: roundsType[]
  matches: Match[]
  results: Results[]
  tickets: Tickets[]
  strategies: Strategies[]
  reviews: Reviews[]
}

export default function MatchesList({
  matches,
  teams,
  competitions,
  rounds,
  results,
  tickets,
  strategies,
  reviews
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
      {paginatedItems?.map((match, i) => {
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
                strategies={strategies}
                reviews={reviews}
              />
            </div>
            <div className="grid grid-cols-app items-center justify-center">
              <div className="flex items-center justify-start px-3 py-2">
                <Badge
                  name={match.result?.result_name!}
                  textColor='text-white'
                  bg={`${match.result?.result_id === 3 ? 'bg-red-600'
                  : match.result?.result_id === 2
                  ? 'bg-green-600'
                  : match.result?.result_id === 4
                  ? 'bg-yellow-400'
                  : 'bg-sky-600'}`}
                  {...techBadgeAnimation}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                />
              </div>
              <div className="flex items-center justify-start px-3 py-2">
                <Badge
                  name={match.strategy.strategy_name}
                  textColor='text-white'
                  {...techBadgeAnimation}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-start px-3 py-2 bg-">
                <Badge
                  name={match.review?.review_name!}
                  textColor='text-white'
                  bg={`${match.review?.review_name === 'race' || match.review?.review_name === 'home' || match.review?.review_name === 'must-win' || match.review?.review_name === '+goal' ? 'bg-zinc-800'
                        : match.review?.review_name === 'live'
                        ? 'bg-black'
                        : match.review?.review_name === 'cycles'
                        ? 'bg-blue-600'
                        : 'bg-red-600'}`}
                  {...techBadgeAnimation}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                />
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
