/* eslint-disable react/jsx-no-comment-textnodes */
'use client'
import { useState } from 'react'
import axios from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
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
import { useMutation } from '@tanstack/react-query'
import { useQueryClientInstance } from '@/context/query-client-context-client'

type Competition = {
  competition_id: number
  competition_name: string
  season_name: string
  createdAt: Date | null
}

const FormUpdateCompetitionSchema = z.object({
  competition_name: z.string({
    required_error: 'Please select a home team.',
  }),
  season_name: z.string({
    required_error: 'Please select a away team.',
  }),
})

type UpdateCompetitionSchema = z.infer<typeof FormUpdateCompetitionSchema>

const UpdateCompetition = ({ competition }: { competition: Competition }) => {
  const { queryClient } = useQueryClientInstance()

  const form = useForm<UpdateCompetitionSchema>({
    resolver: zodResolver(FormUpdateCompetitionSchema),
    defaultValues: {
      competition_name: competition.competition_name,
      season_name: competition.season_name,
    },
  })

  const [open, setOpen] = useState(false)

  const { mutate: updateCopetition, isPending } = useMutation({
    mutationFn: async (data: UpdateCompetitionSchema) =>
      await axios.patch(`/api/competitions/${competition.competition_id}`, {
        competition_name: data.competition_name,
        season_name: data.season_name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] })
    },
  })

  const onSubmit = async (data: UpdateCompetitionSchema) => {
    updateCopetition(data)
    setOpen(false)
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
          <DialogTitle>
            Editar o time {competition.competition_name}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="competition_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Copetição</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-[200px]"
                      placeholder="Copa do brasil"
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
                      type="text"
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
      </DialogContent>
    </Dialog>
  )
}

export default UpdateCompetition
