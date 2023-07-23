'use client'
import { Tickets } from '@prisma/client'
import { DeleteTicket } from './deleteTicket'
import { UpdateTicket } from './updateTicket'
import { AddTicket } from './addTicket'

export const ListTickets = ({ tickets }: { tickets: Tickets[] }) => {
  return (
    <div>
      <div>
        <AddTicket />
      </div>
      {tickets.map((ticket) => {
        return (
          <div className="flex gap-4" key={ticket.ticketId}>
            <div>{ticket.ticketId}</div>
            <div>{ticket.result}</div>
            <div>
              <UpdateTicket ticket={ticket} />
            </div>
            <div>
              <DeleteTicket ticket={ticket} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
