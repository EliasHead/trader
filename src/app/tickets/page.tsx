import { prisma } from '@/utils/prisma'
import { ListTickets } from './listTickets'
import { FilterTickets } from '@/components/filters/filterTickets'

const getTickets = async () => {
  const res = prisma.tickets.findMany()

  return res
}
const Tickets = async () => {
  const tickets = await getTickets()

  return (
    <main className="mt-16 flex h-screen flex-col items-center gap-4 bg-white">
      <FilterTickets tickets={tickets} />
      <ListTickets tickets={tickets} />
    </main>
  )
}

export default Tickets
