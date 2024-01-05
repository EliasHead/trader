'use client'

import { Tickets } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from "@/components/ui/checkbox"

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
    header: 'Resultado',
  },
  {
    accessorKey: 'odd',
    header: 'Odd',
  }, 
]
