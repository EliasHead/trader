import SearchCompetition from './SearchCompetition'
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export default async function CompentitionsList() {
  const competitions = await prisma.competition.findMany()

  return (
    <>
      <ul>
        <SearchCompetition competitions={competitions} />
      </ul>
    </>
  )
}
