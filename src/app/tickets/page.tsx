import { prisma } from '@/utils/prisma'
import { ListTickets } from './listTickets'
import { FilterTickets } from '@/components/filters/filterTickets'

const getTickets = async () => {
  const res = prisma.tickets.findMany({
    include: {
      Matches: {
        select: {
          match_id: true,
        },
      },
    },
    orderBy: [{ ticketId: 'desc' }],
  })

  return res
}
const Tickets = async () => {
  const tickets = await getTickets()

  return (
    <div className="mt-16 flex h-screen flex-col items-center gap-4">
      <FilterTickets tickets={tickets} />
      <ListTickets tickets={tickets} />
    </div>
  )
}

export default Tickets
