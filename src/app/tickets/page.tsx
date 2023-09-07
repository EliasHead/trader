import { prisma } from '@/utils/prisma'
import { DatePicker } from '@/components/ui/DatePicker'

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
    <div className="mt-16 min-h-screen">
      <DatePicker tickets={tickets} leverages={leverages} />
    </div>
  )
}

export default Tickets
