import { Tickets } from '@prisma/client'
import { TicketDelete } from './ticketDelete'
import { TicketUpdate } from './ticketUpdate'
import { TicketAdd } from './ticketAdd'

export const TicketsList = ({ tickets }: { tickets: Tickets[] }) => {
  return (
    <div>
      <div>
        <TicketAdd />
      </div>
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
