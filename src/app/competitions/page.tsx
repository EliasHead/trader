import CompentitionsList from '@/components/competition/CompetitionList'
import AddCompetitions from '@/components/competition/addCompetitions'
import { prisma } from '@/utils/prisma'

export default async function Competitions() {
  const competitions = await prisma.competition.findMany()
  return (
    <div className="mt-16 flex h-screen flex-col items-center justify-start gap-4">
      <h1>
        <strong>Campeonatos</strong>
      </h1>
      <AddCompetitions />
      <CompentitionsList competitions={competitions} />
    </div>
  )
}
