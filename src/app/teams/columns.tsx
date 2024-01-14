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
import { UpdateTeams } from './updateTeams'
import { TeamType } from './types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import DeleteTeam from './deleteTeam'
// import DeleteTeam from './deleteTeam'

// import DeleteTeam from './deleteTeam'
// import { Badge } from '@/components/ui/badge'
// import { EditTicket } from '@/components/edit-ticket'
// import { DeleteTicket } from './deleteTicket'
// function onSubmit(data: z.infer<typeof FormSchema>) {
//   console.log(data)
//   // setIsLoading(true)
//   // await axios.patch(`/api/matches/${team.team_id}`, {
//   //   home_team_id: data.home_team,
//   //   home_goals: data.home_goals,
//   //   visitor_team_id: data.away_team,
//   //   visitor_goals: data.away_goals,
//   //   competition_id: data.competition,
//   //   round: data.round,
//   //   result_id: data.result,
//   //   ticketId: data.ticket,
//   //   strategy_id: data.strategy,
//   //   odd: data.odd,
//   //   review_id: data.review,
//   // })
//   // console.log(data)
//   // setIsLoading(false)
//   // router.refresh()
//   // setIsOpen(false)
//   // form.reset()
// }

// const form = useForm<z.infer<typeof FormSchema>>({
//   resolver: zodResolver(FormSchema),
//   defaultValues: {
//     team_name: team.team_name,
//   },
// })

export const columns: ColumnDef<TeamType>[] = [
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
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
              <UpdateTeams team={team} />
            </DropdownMenuItem>
            {/* <Dialog>
              <DialogTrigger>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Editar
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar o time {team.team_id}</DialogTitle>
                  <DialogDescription>
                    Here you can add fields to update your form
                  </DialogDescription>
                </DialogHeader>
                <UpdateTeams team={team} />
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Excluir
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}

            {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <UpdateTeams team={team} />
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeleteTeam team={team} />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
