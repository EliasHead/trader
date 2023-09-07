import { Tickets } from '@prisma/client'
import { ProgressBar } from '../ui/progressBar'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { ArrowDown, ArrowUp, File } from 'lucide-react'

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
            <div className="text-2xl font-bold">{greens}</div>
            <p className="text-xs text-muted-foreground">total de greens</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Derrotas</CardTitle>
            <ArrowDown size={24} color="#dc2626" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reds}</div>
            <p className="text-xs text-muted-foreground">total de reds</p>
          </CardContent>
        </Card>
      </div>
      <ProgressBar rate={rateGreens} bgColor="bg-green-600" title="Vitorias" />
      <ProgressBar rate={rateReds} bgColor="bg-red-600" title="Derrotas" />
    </div>
  )
}
