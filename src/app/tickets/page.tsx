import { prisma } from '@/utils/prisma'
import { DatePicker } from '@/components/ui/DatePicker'
import { Label } from '@/components/ui/label'

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
    <div className="col-span-1 mt-16 grid min-h-screen w-full space-y-2">
      <Label htmlFor="date" className="ml-4 shrink-0">
        Selecione uma data
      </Label>
      <DatePicker tickets={tickets} leverages={leverages} />
    </div>
  )
}

export default Tickets
