import { Leverage, Matches, Results, Tickets } from '@prisma/client'
import { ProgressBar } from '../ui/progressBar'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { ArrowDown, ArrowUp, File } from 'lucide-react'

type TicketsType = {
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
  // result_id?: number | null;
};

interface FilterTicketsProps {
  tickets: TicketsType[]
  from: Date | undefined
  to: Date | undefined
}

export const FilterTickets = ({ tickets, from, to }: FilterTicketsProps) => {
  const dataArray = tickets.filter((a) => {
    return a.createdAt >= from! && a.createdAt <= to!
  })

  const ticketsFormat = from === undefined ? tickets : dataArray
  const greens = ticketsFormat.filter(
    (ticket) => ticket.result?.result_id === 2,
  ).length
  const reds = ticketsFormat.filter((ticket) => ticket.result?.result_id === 3).length
  const totalTickets = greens + reds

  const rateGreens = ((greens / totalTickets) * 100).toFixed(0)
  const rateReds = ((reds / totalTickets) * 100).toFixed(0)

  return (
    <div className="mx-auto mt-6 w-[90%]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bilhetes</CardTitle>
            <File size={24} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-muted-foreground">total de bilhetes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vitorias</CardTitle>
            <ArrowUp size={24} color="#16a34a" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{greens}</div>
            <p className="text-xs text-muted-foreground">total de greens</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Derrotas</CardTitle>
            <ArrowDown size={24} color="#dc2626" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{reds}</div>
            <p className="text-xs text-muted-foreground">total de reds</p>
          </CardContent>
        </Card>
      </div>
      <ProgressBar rate={rateGreens} bgColor="bg-green-600" title="Vitorias" />
      <ProgressBar rate={rateReds} bgColor="bg-red-600" title="Derrotas" />
    </div>
  )
}
