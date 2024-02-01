'use client'
import { Leverage, Matches, Results, Tickets } from '@prisma/client'
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
import { DeleteTicket } from '@/app/tickets/deleteTicket'
import { PowerRankingType } from '@/app/fairlines/types'
import { DeletePowerRanking } from './delete-power-ranking'
import { EditPowerRanking } from './edit-power-ranking'
// import { DeleteTicket } from './deleteTicket'

export const columns: ColumnDef<PowerRankingType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  // },
  {
    accessorKey: 'position',
    header: 'Posição',
  },
  {
    accessorKey: 'team.team_name',
    header: 'Time',
  },
  {
    accessorKey: 'competition.competition_name',
    header: 'campeonato',
    // cell: ({ row }) => {
    //   const {competition} = row.original
    //   return <div>{competition?.competition_name}</div>
    // },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const powerRanking = row.original

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
              <EditPowerRanking powerRinking={powerRanking} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeletePowerRanking powerRanking={powerRanking} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
