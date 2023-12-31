import SearchTeams from './SearchTeams'
// import AddTeams from './addTeams'
import { db as prisma } from '@/lib/db'

const getTeams = async () => {
  const res = await prisma.teams.findMany({
    select: {
      team_id: true,
      team_name: true,
      team_country: true,
      team_initials: true,
      createdAt: true,
    },
  })
  return res
}

export default async function Teams() {
  const teams = await getTeams()

  return (
    <main className="mt-12 flex h-screen flex-col items-center justify-start gap-4">
      <SearchTeams teams={teams} />
    </main>
  )
}
