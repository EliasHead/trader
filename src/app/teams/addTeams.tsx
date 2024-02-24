'use client'
import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useQueryClientInstance } from '@/context/query-client-context-client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
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

const FormAddTeamsSchema = z.object({
  team_name: z.string({
    required_error: 'Por favor preencher o nome.',
  }),
  team_country: z.string({
    required_error: 'Por favor preencher o país.',
  }),
})

type CreateTeamSchema = z.infer<typeof FormAddTeamsSchema>

const AddTeams = () => {
  const [open, setOpen] = useState(false)
  const { queryClient } = useQueryClientInstance()

  const { mutate: createTeam, isPending } = useMutation({
    mutationFn: async (data: CreateTeamSchema) =>
      await axios.post('/api/teams', {
        team_name: data.team_name,
        team_country: data.team_country,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    },
  })

  async function onSubmit(data: CreateTeamSchema) {
    createTeam(data)
    setOpen(false)
    form.reset()
  }

  const form = useForm<CreateTeamSchema>({
    resolver: zodResolver(FormAddTeamsSchema),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="justify-start self-start px-2 text-popover-foreground hover:bg-background/50 hover:no-underline"
          variant="link"
        >
          Novo time
        </Button>
      </DialogTrigger>
      <DialogContent className='className="sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Nova Competição</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-wrap gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="team_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[200px]"
                      placeholder="Ex: Inter"
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
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[200px]"
                      placeholder="Ex: Brasil"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="modal-action">
              <DialogClose asChild>
                <Button type="button" variant={'outline'}>
                  Close
                </Button>
              </DialogClose>
              {!isPending ? (
                <Button type="submit">Salvar</Button>
              ) : (
                <Button type="button" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTeams
