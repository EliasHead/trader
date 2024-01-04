'use client'
import { Tickets } from '@prisma/client'
import { DeleteTicket } from './deleteTicket'
import { UpdateTicket } from './updateTicket'
import { AddTicket } from './addTicket'
import React, { useState } from 'react'
import Pagination from '@/components/pagination/pagination'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type LeverageType = {
  leverageId: number
  goal: string | null
  result: string | null
  createdAt: Date
}
interface Match extends Tickets {
  Matches?: object[]
  match_id?: number | null
}

type TicketsProps = {
  tickets: Match[]
  leverages: LeverageType[]
  from: Date | undefined
  to: Date | undefined
}

export const ListTickets = ({ tickets, leverages, from, to }: TicketsProps) => {
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
    <div>

    <div className="grid grid-cols-1 items-center sm:hidden">
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
                ticket.result === 'green'
                  ? 'bg-green-600'
                  : ticket.result === 'draw'
                  ? 'bg-yellow-400'
                  : ticket.result === 'red' 
                  ? 'bg-red-600'
                  : 'bg-blue-600'
            }`}>{ticket.result}</Badge>
            <div>
              <UpdateTicket ticket={ticket} leverages={leverages} />
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
      <div className="m-auto">
        <AddTicket />
      </div>
      <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      {paginatedItems.map((ticket) => {
        return (
          <div>
            <TableHeader key={ticket.ticketId}>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
          </div>
        )
      })}
      </Table>
    </div>
  )
}
