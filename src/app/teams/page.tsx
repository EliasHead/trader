// import SearchTeams from './SearchTeams'
// import AddTeams from './addTeams'
import { db as prisma } from '@/lib/db'
import { DataTable } from './data-table'
import { columns } from './columns'

const getTeams = async () => {
  const teams = await prisma.teams.findMany()
  return teams
}

export default async function Teams() {
  const teams = await getTeams()
  return (
    <section className="flex w-full flex-col py-32 pb-10 sm:pb-32 lg:pb-[110px]">
      <div className="container flex flex-col justify-between gap-4 lg:justify-center">
        <DataTable columns={columns} data={teams} />
        {/* <SearchTeams teams={teams} /> */}
      </div>
    </section>
  )
}
