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
  const leverages = await prisma.leverage.findMany({
    orderBy: [{ leverageId: 'desc' }],
  })

  return (
    <div className="mt-16 flex flex-col items-center gap-4">
      <FilterTickets tickets={tickets} />
      <ListTickets tickets={tickets} leverages={leverages} />
    </div>
  )
}

export default Tickets
