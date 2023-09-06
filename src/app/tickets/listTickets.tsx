'use client'
import { Tickets } from '@prisma/client'
import { DeleteTicket } from './deleteTicket'
import { UpdateTicket } from './updateTicket'
import { AddTicket } from './addTicket'
import React, { useState } from 'react'
import Pagination from '@/components/pagination/pagination'
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange'
import { addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'

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
}

export const ListTickets = ({ tickets, leverages }: TicketsProps) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const from = date?.from
  const to = date?.to

  const dataArray = tickets.filter((a) => {
    return a.createdAt >= from! && a.createdAt <= to!
  })

  console.log('from: ', from, 'to: ', to)
  console.log(dataArray)

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const totalPages = Math.ceil(tickets.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedItems = date ? dataArray : tickets.slice(startIndex, endIndex)

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
    <div className="grid grid-cols-1 gap-1">
      <div className="flex">
        <AddTicket />
        <DatePickerWithRange date={date} setDate={setDate} />
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
              className={`rounded text-center font-bold text-white ${
                ticket.result === 'green'
                  ? 'bg-green-600'
                  : ticket.result === 'draw'
                  ? 'bg-yellow-400'
                  : 'bg-red-600'
              }`}
            >
              {ticket.result}
            </div>
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
  )
}
