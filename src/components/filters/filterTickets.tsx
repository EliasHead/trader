import { Tickets } from '@prisma/client'
import { ProgressBar } from '../ui/progressBar'

interface FilterTicketsProps {
  tickets: Tickets[]
  from: Date | undefined
  to: Date | undefined
}

export const FilterTickets = ({ tickets, from, to }: FilterTicketsProps) => {
  const dataArray = tickets.filter((a) => {
    return a.createdAt >= from! && a.createdAt <= to!
  })

  const ticketsFormat = from === undefined ? tickets : dataArray
  const greens = ticketsFormat.filter(
    (ticket) => ticket.result === 'green',
  ).length
  const reds = ticketsFormat.filter((ticket) => ticket.result === 'red').length
  const totalTickets = greens + reds

  const rateGreens = ((greens / totalTickets) * 100).toFixed(0)
  const rateReds = ((reds / totalTickets) * 100).toFixed(0)

  return (
    <div className="mx-auto w-[90%]">
      <div className="col-auto grid grid-cols-3 justify-items-center gap-4 py-4">
        <div className="text-center">
          <div className="p-2">Total</div>
          <div className="p-2">{totalTickets}</div>
        </div>
        <div className="text-center">
          <div className="p-2">Vitorias</div>
          <div className="p-2">{greens}</div>
        </div>
        <div className="text-center">
          <div className="p-2">Derrotas</div>
          <div className="p-2">{reds}</div>
        </div>
      </div>
      <ProgressBar rate={rateGreens} bgColor="bg-green-600" title="Vitorias" />
      <ProgressBar rate={rateReds} bgColor="bg-red-600" title="Derrotas" />
    </div>
  )
}
