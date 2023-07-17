import SearchTeams from './SearchTeams'
import AddTeams from './addTeams'

import { prisma } from '@/utils/prisma'

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
    <div className="container mt-16 flex h-screen flex-col items-center justify-start gap-4">
      <h1>
        <strong>Times</strong>
      </h1>
      <AddTeams teams={teams} />
      <SearchTeams teams={teams} />
    </div>
  )
}
