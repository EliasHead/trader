import { db as prisma } from '@/lib/db'
import { HeroSection } from "@/components/pages/fairline/hero-section"

const getPoweRanks = async () => {
  const powerRankings = await prisma.powerRankings.findMany({
    include: {
      competition: true,
      team: true,
    },
    orderBy: [{position: 'asc'}]
  })

  return powerRankings
} 

const FairLines = async () => {
  const powerRankings = await getPoweRanks()
  return (
  <>
    <HeroSection powerRankings={powerRankings}  />
  </>
  )
}

export default FairLines