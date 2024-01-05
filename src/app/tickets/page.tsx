import { db as prisma } from '@/lib/db'
import { DatePicker } from '@/components/ui/DatePicker'
import { Label } from '@/components/ui/label'
import { DataTable } from './data-table'
import { columns } from './columns'

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
      {/* <DataTable columns={columns} data={tickets}/> */}
      <Label htmlFor="date" className="ml-4 shrink-0">
        Selecione uma data
      </Label>
      <DatePicker tickets={tickets} leverages={leverages} />
    </div>
  )
}

export default Tickets
