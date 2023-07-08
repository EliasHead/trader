import AddTeams from '@/components/teams/addTeams'
import TeamsList from '@/components/teams/teamsList'
import { prisma } from '@/utils/prisma'

export default async function Teams() {
  const teams = await prisma.teams.findMany()

  return (
    <div className="mt-16 flex h-screen flex-col items-center justify-start gap-4">
      <h1>
        <strong>Times</strong>
      </h1>
      <AddTeams />
      <TeamsList teams={teams} />
    </div>
  )
}
