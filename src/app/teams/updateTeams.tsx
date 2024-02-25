'use client'
import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Loader2 } from 'lucide-react'

import { TeamType } from './types'
import { useQueryClientInstance } from '@/context/query-client-context-client'
import { useMutation } from '@tanstack/react-query'

const FormUpdateTeamSchema = z.object({
  team_name: z.string({
    required_error: 'Please select a home team.',
  }),
  team_country: z.string({
    required_error: 'Please select a away team.',
  }),
})

type UpdateTeamSchema = z.infer<typeof FormUpdateTeamSchema>

export const UpdateTeams = ({ team }: { team: TeamType }) => {
  const { queryClient } = useQueryClientInstance()
  // const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // const router = useRouter()

  const form = useForm<UpdateTeamSchema>({
    resolver: zodResolver(FormUpdateTeamSchema),
    defaultValues: {
      team_name: team.team_name,
      team_country: team.team_country,
    },
  })

  const { mutate: updateTeam, isPending } = useMutation({
    mutationFn: async (data: UpdateTeamSchema) =>
      await axios.patch(`/api/teams/${team.team_id}`, {
        team_name: data.team_name,
        team_country: data.team_country,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    },
  })

  async function onSubmit(data: UpdateTeamSchema) {
    updateTeam(data)
    setOpen(!open)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start self-start px-2 text-popover-foreground hover:bg-background/50 hover:no-underline"
          variant={'link'}
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar o time {team.team_name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="team_name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-[200px]"
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="team_country"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-[200px]"
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="modal-action">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                {!isPending ? (
                  <Button type="submit">Save</Button>
                ) : (
                  <Button type="button" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deletando...
                  </Button>
                )}
              </div>
              <DialogFooter className="sm:justify-start"></DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
