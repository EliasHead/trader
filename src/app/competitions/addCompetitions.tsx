'use client'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useQueryClientInstance } from '@/context/query-client-context-client'
import { useMutation } from '@tanstack/react-query'
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
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

const FormAddCompetitionSchema = z.object({
  competition_name: z.string({
    required_error: 'Por favor preencher o nome.',
  }),
  season_name: z.string({
    required_error: 'Por favor preencher o ano.',
  }),
})

type CreateCompetitionSchema = z.infer<typeof FormAddCompetitionSchema>

const AddCompetitions = () => {
  const [open, setOpen] = useState(false)
  const { queryClient } = useQueryClientInstance()

  const { mutate: createCompetition, isPending } = useMutation({
    mutationFn: async (data: CreateCompetitionSchema) =>
      await axios.post('/api/competitions', {
        competition_name: data.competition_name,
        season_name: data.season_name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] })
    },
  })

  async function onSubmit(data: CreateCompetitionSchema) {
    createCompetition(data)
    setOpen(false)
    form.reset()
  }

  const form = useForm<CreateCompetitionSchema>({
    resolver: zodResolver(FormAddCompetitionSchema),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="justify-start self-start px-2 text-popover-foreground hover:bg-background/50 hover:no-underline"
          variant="link"
        >
          novo campeonato
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
              name="competition_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Competição</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[200px]"
                      placeholder="Copa do Brasil"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="season_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[200px]"
                      placeholder="2023/2024"
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

export default AddCompetitions
