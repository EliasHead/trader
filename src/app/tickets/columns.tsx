'use client'
import { Tickets } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EditTicket } from '@/components/edit-ticket'

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

export const columns: ColumnDef<Tickets>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'ticketId',
    header: 'Ticket Id',
  },
  {
    accessorKey: 'Matches.length',
    header: 'Jogos',
  },
  {
    accessorKey: 'result',
    header: () => <div className="text-right">Result</div>,
    cell: ({ row }) => {
      const result: string = row.getValue("result")
 
      return <Badge className={`uppercase ${
        result === 'green'
          ? 'bg-green-600'
          : result === 'draw'
          ? 'bg-yellow-400'
          : result === 'red' 
          ? 'bg-red-600'
          : 'bg-blue-600'
    }`}>{result}</Badge>
      // <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'odd',
    header: 'Odd',
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticket = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <EditTicket ticket={ticket} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  } 
]
