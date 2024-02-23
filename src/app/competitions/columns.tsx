'use client'
import {
  Competition,
  Leverage,
  Matches,
  Results,
  Tickets,
} from '@prisma/client'
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
import UpdateCompetition from './updateCompetition'
// import { PowerRankingType } from '@/app/fairlines/types'
// import { DeletePowerRanking } from './delete-power-ranking'
// import { EditPowerRanking } from './edit-power-ranking'
// import { DeleteTicket } from './deleteTicket'

export const columns: ColumnDef<Competition>[] = [
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
  // {
  //   accessorKey: 'leverageId',
  //   header: 'id',
  // },
  {
    accessorKey: 'competition_id',
    header: 'Id',
  },
  {
    accessorKey: 'competition_name',
    header: 'Jogos',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const competition = row.original

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
              <UpdateCompetition competition={competition} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {/* <DeletePowerRanking powerRanking={powerRanking} /> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
