'use client'
import { Tickets } from '@prisma/client'
import { DeleteTicket } from './deleteTicket'
import { UpdateTicket } from './updateTicket'
import { AddTicket } from './addTicket'

export const ListTickets = ({ tickets }: { tickets: Tickets[] }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-1">
      <div>
        <AddTicket />
      </div>
      {tickets.map((ticket) => {
        return (
          <div
            className="grid grid-cols-4 items-center gap-4 rounded px-4 py-4 shadow-lg sm:m-auto sm:px-8"
            key={ticket.ticketId}
          >
            <div>{ticket.ticketId}</div>
            <div
              className={`rounded-full text-center font-bold text-white ${
                ticket.result === 'green' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {ticket.result}
            </div>
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
