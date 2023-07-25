import { Tickets } from '@prisma/client'
import { ProgressBar } from '../ui/progressBar'

export const FilterTickets = ({ tickets }: { tickets: Tickets[] }) => {
  const greens = tickets.filter((ticket) => ticket.result === 'green').length
  const reds = tickets.filter((ticket) => ticket.result === 'red').length
  const totalTickets = greens + reds

  const rateGreens = ((greens / totalTickets) * 100).toFixed(0)
  const rateReds = ((reds / totalTickets) * 100).toFixed(0)

  return (
    <div className="w-full">
      <div className="flex flex-col justify-around py-4">
        <div className="flex items-center justify-around">
          <div>Total</div>
          <div>Vitorias</div>
          <div>Derrotas</div>
        </div>
        <div className="flex items-center justify-around p-2">
          <div>{totalTickets}</div>
          <div>{greens}</div>
          <div>{reds}</div>
        </div>
      </div>
      <ProgressBar rate={rateGreens} bgColor="bg-green-600" title="Vitorias" />
      <ProgressBar rate={rateReds} bgColor="bg-red-600" title="Derrotas" />
    </div>
  )
}
