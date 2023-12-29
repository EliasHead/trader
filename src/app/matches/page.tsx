// import { resultsData } from '@/utils/results'
import MatchesList from './MatchesList'
import AddMatches from './addMatches'
import { db as prisma } from '@/lib/db'
import { dataRounds } from '@/utils/rounds'

// TODO: melhorar chamada api
const getMatches = async () => {
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
          result: true,
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
  const teams = await prisma.teams.findMany()
  const competitions = await prisma.competition.findMany()
  const tickets = await prisma.tickets.findMany({
    orderBy: [{ ticketId: 'desc' }],
  })
  const rounds = dataRounds
  const matches = await getMatches()
  const strategies = await prisma.strategies.findMany()
  const results = await prisma.results.findMany()
  const reviews = await prisma.reviews.findMany()

  return (
    <div className="mt-12 grid grid-cols-1 items-center space-y-4">
      <AddMatches 
        teams={teams} 
        competitions={competitions} 
        rounds={rounds}
        strategies={strategies} 
        reviews={reviews} />
      <MatchesList
        competitions={competitions}
        matches={matches}
        rounds={rounds}
        teams={teams}
        results={results}
        tickets={tickets}
      />
    </div>
  )
}
