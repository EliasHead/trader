import { db as prisma } from '@/lib/db'
import { HeroSection } from '@/components/pages/fairline/hero-section'

const getPoweRanks = async () => {
  const powerRankings = await prisma.powerRankings.findMany({
    include: {
      competition: true,
      team: true,
    },
    orderBy: [{ position: 'asc' }],
  })

  return powerRankings
}

const getTeams = async () => {
  const teamsData = await prisma.teams.findMany()

  return teamsData
}

const getCompetitions = async () => {
  const competitionsData = await prisma.competition.findMany()

  return competitionsData
}

const FairLines = async () => {
  const powerRankings = await getPoweRanks()
  const teams = await getTeams()
  const competitions = await getCompetitions()

  return (
    <>
      <HeroSection
        powerRankings={powerRankings}
        teams={teams}
        competitions={competitions}
      />
    </>
  )
}

export default FairLines
