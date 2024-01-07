import { db as prisma } from '@/lib/db'
import { DatePicker } from '@/components/ui/DatePicker'
import { Label } from '@/components/ui/label'
import { DataTable } from './data-table'
import { columns } from './columns'
import { AddTicket } from './addTicket'
import { Tickets } from '@prisma/client'

interface Match extends Tickets {
  Matches?: object[]
  match_id?: number | null
  result: {
    result_id: number
    result_name: String
  } | null
}

const getTickets = async () => {
  const ticketsWithRelations = await prisma.tickets.findMany({
    include: {
      leverage: true, // Assuming 'leverage' is a relation in the Tickets model
      Matches: {
        include: {
          leverage: true, // Assuming 'leverage' is a relation in the Matches model
          competition: true, // Assuming 'competition' is a relation in the Matches model
          home_team: true, // Assuming 'home_team' is a relation in the Matches model
          visitor_team: true, // Assuming 'visitor_team' is a relation in the Matches model
          strategy: true, // Assuming 'strategy' is a relation in the Matches model
          review: true, // Assuming 'review' is a relation in the Matches model
          result: true, // Assuming 'result' is a relation in the Matches model
        }
      },
      result: true, // Assuming 'result' is a relation in the Tickets model
    },
    orderBy: [{ ticketId: 'desc'}]
  }); 
//   const res: Tickets[] = await prisma.$queryRaw`
//      SELECT
//     t.*,
//     m.match_id,
//     r.result_id,
//     r.result_name
//   FROM
//     tickets AS t
//     LEFT JOIN Matches AS m ON t.ticketId = m.ticketId and t.ticketId = 1
//     LEFT JOIN Results AS r ON t.result_id = r.result_id
// `;

  return ticketsWithRelations
}

const getLeverage = async () => {
  const leverages = await prisma.leverage.findMany({
    orderBy: [{ leverageId: 'desc' }],
  })
  return leverages
}
const getResults = async () => {
  const resData = await prisma.results.findMany({
    orderBy: [{ result_id: 'desc' }],
  })
  return resData
}

const TicketsList = async () => {
  const tickets = await getTickets()
  const leverages = await getLeverage()
  const results = await getResults()
  console.log(tickets)

  return (
    <div className="col-span-1 mt-16 grid min-h-screen w-full space-y-2">
      <div className="m-auto">
        <AddTicket />
      </div>
      <Label htmlFor="date" className="ml-4 shrink-0">
        Selecione uma data
      </Label>
      <DatePicker tickets={tickets} leverages={leverages} results={results} />
      <DataTable columns={columns} data={tickets}/>
    </div>
  )
}

export default TicketsList
