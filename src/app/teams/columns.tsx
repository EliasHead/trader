'use client'
import { Teams } from '@prisma/client'
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
import UpdateTeams from './updateTeams'
import DeleteTeam from './deleteTeam'
// import { Badge } from '@/components/ui/badge'
// import { EditTicket } from '@/components/edit-ticket'
// import { DeleteTicket } from './deleteTicket'

export const columns: ColumnDef<Teams>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
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
    accessorKey: 'team_id',
    header: 'Id',
  },
  {
    accessorKey: 'team_name',
    header: 'Nome',
  },
  {
    accessorKey: 'team_country',
    header: 'País',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const team = row.original

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
              {/* <EditTicket ticket={ticket} /> */}
              <UpdateTeams team={team} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {/* <DeleteTicket ticket={ticket} /> */}
              <DeleteTeam team={team} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
