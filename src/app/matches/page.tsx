import MatchesList from '@/components/matches/MatchesList'
import { AddMatches } from '@/components/matches/addMatches'
import { prisma } from '@/utils/prisma'
import { dataRounds } from '@/utils/rounds'

export default async function Matches() {
  const teams = await prisma.teams.findMany()
  const competitions = await prisma.competition.findMany()
  const rounds = dataRounds

  return (
    <div className="mt-16 flex h-screen w-full flex-col items-center justify-start gap-4">
      <h1>
        <strong>Jogos</strong>
      </h1>
      <AddMatches teams={teams} competitions={competitions} rounds={rounds} />
      <MatchesList />
    </div>
  )
}
