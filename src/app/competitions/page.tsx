import { Competition } from '@prisma/client';
import SearchCompetition from './SearchCompetition'
import { db as prisma } from '@/lib/db'

const getCompetitions = async () => {
  const result: Competition[] = await prisma.$queryRaw`
    SELECT c.*, COUNT(m.match_id) as green_matches_count
    FROM competitions c
    LEFT JOIN matches m ON c.competition_id = m.competition_id AND m.result = 'green'
    GROUP BY c.competition_id
    ORDER BY green_matches_count DESC`;
  
  return result
}

const Competitions = async () => {
  const competitions = await getCompetitions()
  return (
    <main className="mt-16 flex h-screen flex-col items-center justify-start gap-4">
      <h1>
        <strong>Campeonatos</strong>
      </h1>
      <SearchCompetition competitions={competitions} />
    </main>
  )
}

export default Competitions
