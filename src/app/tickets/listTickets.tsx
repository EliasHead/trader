'use client'
import { Leverage, Matches, Results, Tickets } from '@prisma/client'
import { DeleteTicket } from './deleteTicket'
import { UpdateTicket } from './updateTicket'
import { AddTicket } from './addTicket'
import React, { useState } from 'react'
import Pagination from '@/components/pagination/pagination'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// type LeverageType = {
//   leverageId: number
//   goal: string | null
//   result: string | null
//   createdAt: Date
// }
type TicketsProps = {
  ticketId: number;
  createdAt: Date;
  updatedAt: Date;
  odd?: number | null;
  stake?: number | null;
  resultStake: number;
  leverage?: Leverage | null;
  leverageId?: number | null;
  Matches: Matches[];
  result?: Results | null;
  result_id?: number | null;
};
// type TicketsProps = {
//   tickets: Tickets[]
//   Matches?: {
//     match_id: number
//   }
//   result?: {
//     result_id: number
//     result_name: String
//   }
// }

type ListTicketsProps = {
  tickets: TicketsProps[]
  leverages: Leverage[]
  results: Results[]
  from: Date | undefined
  to: Date | undefined
}

export const ListTickets = ({ tickets, leverages, results, from, to }: ListTicketsProps) => {
  const dataArray = tickets.filter((a) => {
    return a.createdAt >= from! && a.createdAt <= to!
  })

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const totalPages = Math.ceil(tickets.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems =
    from === undefined
      ? tickets.slice(startIndex, endIndex)
      : dataArray.slice(startIndex, endIndex)

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
    <div className="grid grid-cols-1 items-center">
      <div className="m-auto">
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
            <Badge className={`uppercase ${
                ticket.result?.result_id === 2
                  ? 'bg-green-600'
                  : ticket.result?.result_id === 4
                  ? 'bg-yellow-400'
                  : ticket.result?.result_id === 3 
                  ? 'bg-red-600'
                  : 'bg-blue-600'
            }`}>{ticket.result?.result_name}</Badge>
            <div>
              <UpdateTicket ticket={ticket} leverages={leverages} results={results} />
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
