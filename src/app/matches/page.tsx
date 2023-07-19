import { resultsData } from '@/utils/results'
import MatchesList from './MatchesList'
import AddMatches from './addMatches'
import { prisma } from '@/utils/prisma'
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
          description: true,
        },
      },
      competition: {
        select: {
          competition_name: true,
        },
      },
      competition_id: true,
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
  const rounds = dataRounds
  const matches = await getMatches()
  const results = resultsData

  return (
    <div className="container mx-auto mt-16 flex h-screen w-full flex-col items-center justify-start gap-4">
      <h1>
        <strong>Jogos</strong>
      </h1>
      <AddMatches teams={teams} competitions={competitions} rounds={rounds} />
      <MatchesList
        competitions={competitions}
        matches={matches}
        rounds={rounds}
        teams={teams}
        results={results}
      />
    </div>
  )
}
