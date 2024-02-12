import { Competition } from '@prisma/client'
// import SearchCompetition from './SearchCompetition'
import { db as prisma } from '@/lib/db'
import { DataTable } from './data-table'
import { columns } from './columns'
import AddCompetitions from './addCompetitions'

export const getCompetitions = async () => {
  const result: Competition[] = await prisma.$queryRaw`
    SELECT c.*, COUNT(m.match_id) as green_matches_count
    FROM competitions c
    LEFT JOIN matches m ON c.competition_id = m.competition_id AND m.result_id = 2
    GROUP BY c.competition_id
    ORDER BY green_matches_count DESC`

  return result
}

const Competitions = async () => {
  const competitions = await getCompetitions()
  return (
    <section className="flex w-full flex-col py-32 pb-10 sm:pb-32 lg:pb-[110px]">
      <div className="container flex flex-col justify-between gap-4 lg:justify-center">
        <AddCompetitions competitions={competitions} />
        <DataTable columns={columns} data={competitions} />
        {/* <SearchCompetition competitions={competitions} /> */}
      </div>
    </section>
  )
}

export default Competitions
