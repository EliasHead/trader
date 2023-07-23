import { Tickets } from '@prisma/client'
import { TicketDelete } from './ticketDelete'
import { TicketUpdate } from './ticketUpdate'
export const TicketsList = ({ tickets }: { tickets: Tickets[] }) => {
  return (
    <div>
      {tickets.map((ticket) => {
        return (
          <div className="flex gap-4" key={ticket.ticketId}>
            <div>{ticket.ticketId}</div>
            <div>{ticket.result}</div>
            <div>
              <TicketUpdate />
            </div>
            <div>
              <TicketDelete />
            </div>
          </div>
        )
      })}
    </div>
  )
}
