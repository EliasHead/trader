import { FilterCompetitions } from '@/components/filterCompetitions'
import { FilterEstrategies } from '@/components/filterEstrategies'
import { db as prisma } from '@/lib/db'
import { Competition, Strategies } from '@prisma/client'

const getCompetitions = async () => {
  const result: Competition[] = await prisma.$queryRaw`
    SELECT c.*, COUNT(m.match_id) as green_matches_count
    FROM competitions c
    LEFT JOIN matches m ON c.competition_id = m.competition_id AND m.result_id = 2
    GROUP BY c.competition_id
    ORDER BY green_matches_count DESC`

  return result
}

const getStrategies = async () => {
  const result: Strategies[] = await prisma.$queryRaw`
    SELECT s.*, COUNT(m.match_id) as green_matches_count
    FROM strategies s
    LEFT JOIN matches m ON s.strategy_id = m.strategy_id AND m.result_id = 2
    GROUP BY s.strategy_id
    ORDER BY green_matches_count DESC`

  return result
}

export default async function Home() {
  const matches = await prisma.matches.findMany()
  const competitions = await getCompetitions()
  const strategies = await getStrategies()

  return (
    <main className="min-h-screen bg-background">
      <FilterCompetitions competitions={competitions} matches={matches} />
      <FilterEstrategies matches={matches} strategies={strategies} />
    </main>
  )
}
