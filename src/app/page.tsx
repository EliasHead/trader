import { FilterCompetitions } from '@/components/filterCompetitions'
import { FilterEstrategies } from '@/components/filterEstrategies'
import { db as prisma } from '@/lib/db'

export default async function Home() {
  const matches = await prisma.matches.findMany()
  const competitions = await prisma.competition.findMany()

  return (
    <main className="min-h-screen bg-background">
      <FilterCompetitions competitions={competitions} matches={matches} />
      <FilterEstrategies matches={matches} />
    </main>
  )
}
