// import { resultsData } from '@/utils/results'
import MatchesList from './MatchesList'
import { db as prisma } from '@/lib/db'
// import { dataRounds } from '@/utils/rounds'
import { CreateMatch } from './create-match'
import getQueryClient from '@/lib/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
// import { getCompetitions } from '../competitions/page'

// TODO: melhorar chamada api
export const getMatches = async () => {
  const res = await prisma.matches.findMany({
    select: {
      match_id: true,
      match_date: true,
      home_goals: true,
      visitor_goals: true,
      odd: true,
      strategy: true,
      result: true,
      review: true,
      stake: true,
      round: true,
      leverage: {
        select: {
          goal: true,
        },
      },
      leverageId: true,
      competition: {
        select: {
          competition_name: true,
        },
      },
      competition_id: true,
      ticket: {
        select: {
          result_id: true,
        },
      },
      ticketId: true,
      home_team: {
        select: {
          team_name: true,
        },
      },
      home_team_id: true,
      visitor_team: {
        select: {
          team_name: true,
        },
      },
      visitor_team_id: true,
    },
    orderBy: [{ match_id: 'desc' }],
  })
  return res
}

export default async function Matches() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['matches'],
    queryFn: getMatches,
  })

  return (
    <section className="flex w-full flex-col py-32 pb-10 sm:pb-32 lg:pb-[110px]">
      <div className="container flex flex-col justify-between gap-4 lg:justify-center">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MatchesList />
          <CreateMatch />
        </HydrationBoundary>
      </div>
    </section>
  )
}
