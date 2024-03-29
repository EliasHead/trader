'use client'
import { Leverage, Matches, Results } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EditTicket } from '@/components/edit-ticket'
import { DeleteTicket } from './deleteTicket'

type TicketsProps = {
  ticketId: number
  createdAt: Date
  updatedAt: Date
  odd?: number | null
  stake?: number | null
  resultStake: number
  leverage?: Leverage | null
  leverageId?: number | null
  Matches: Matches[]
  result?: Results | null
  result_id?: number | null
}

export const columns: ColumnDef<TicketsProps>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
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
    header: 'Id',
  },
  {
    accessorKey: 'Matches.length',
    header: 'Jogos',
  },
  {
    accessorKey: 'result',
    // accessorFn: (row) => row.result?.result_name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          result
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const result: Results = row.getValue('result')

      return (
        <Badge
          className={`uppercase ${
            result?.result_id === 2
              ? 'bg-green-600'
              : result?.result_id === 4
                ? 'bg-yellow-400'
                : result?.result_id === 3
                  ? 'bg-red-600'
                  : 'bg-blue-600'
          }`}
        >
          {result?.result_name}
        </Badge>
      )
      // <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'odd',
    header: 'Odd',
  },
  {
    id: 'actions',
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
            <DropdownMenuItem asChild>
              <DeleteTicket ticket={ticket} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
