import { FilterCompetitions } from '@/components/filterCompetitions'
import { prisma } from '@/utils/prisma'

export default async function Home() {
  const matches = await prisma.matches.findMany()
  const competitions = await prisma.competition.findMany()

  return (
    <main className="min-h-screen bg-background">
      <FilterCompetitions competitions={competitions} matches={matches} />
    </main>
  )
}
