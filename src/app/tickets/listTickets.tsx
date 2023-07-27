'use client'
import { Tickets } from '@prisma/client'
import { DeleteTicket } from './deleteTicket'
import { UpdateTicket } from './updateTicket'
import { AddTicket } from './addTicket'
import { useState } from 'react'
import Pagination from '@/components/pagination/pagination'

interface Match extends Tickets {
  Matches?: object[]
  match_id?: number | null
}

export const ListTickets = ({ tickets }: { tickets: Match[] }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const totalPages = Math.ceil(tickets.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedItems = tickets.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="grid w-full grid-cols-1 gap-1">
      <div>
        <AddTicket />
      </div>
      {paginatedItems.map((ticket) => {
        return (
          <div
            className="grid grid-cols-5 items-center gap-4 rounded px-4 py-4 shadow-lg sm:m-auto sm:px-8"
            key={ticket.ticketId}
          >
            <div>{ticket.ticketId}</div>
            <div>
              <strong>{ticket.Matches?.length}x</strong>
            </div>
            <div
              className={`rounded-full text-center font-bold uppercase text-white ${
                ticket.result === 'g'
                  ? 'bg-green-600'
                  : ticket.result === 'd'
                  ? 'bg-yellow-400'
                  : 'bg-red-600'
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

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      )}
    </div>
  )
}
