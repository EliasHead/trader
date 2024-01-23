'use client'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Competition, Strategies, Teams } from '@prisma/client'
import axios from 'axios'
import { ChevronsUpDown, Check, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  home_team: z.number({
    required_error: 'Please select a home team.',
  }),
  away_team: z.number({
    required_error: 'Please select a away team.',
  }),
  competition: z.number({
    required_error: 'Please select a competition.',
  }),
  round: z.number({
    required_error: 'Please select a round.',
  }),
  strategy: z.number({
    required_error: 'Selecione a estrategia',
  }),
  odd: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string',
  }),
})

type CreateMatchSchema = z.infer<typeof FormSchema>

type roundsType = {
  round_id: number
  round_name: string
}

type Props = {
  teams: Teams[]
  competitions: Competition[]
  rounds: roundsType[]
  strategies: Strategies[]
}

export const CreateMatch = ({
  teams,
  competitions,
  rounds,
  strategies,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreateMatchSchema>({
    resolver: zodResolver(FormSchema),
  })

  const router = useRouter()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)

    await axios.post('/api/matches', {
      home_team_id: data.home_team,
      visitor_team_id: data.away_team,
      competition_id: data.competition,
      round: data.round,
      strategy_id: data.strategy,
      // review_id: data.reviews,
      odd: data.odd,
    })

    setIsLoading(false)

    router.refresh()

    setOpen(false)

    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="justify-start self-start px-2 text-popover-foreground hover:bg-background/50 hover:no-underline"
          variant="link"
        >
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Novo Jogo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid grid-cols-1 gap-2 space-x-4 space-y-4 sm:grid-cols-3 sm:items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="home_team"
              render={({ field }) => (
                <FormItem className="ml-4 mt-4 flex flex-col">
                  <FormLabel>Casa</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? teams.find((team) => team.team_id === field.value)
                                ?.team_name
                            : 'Select the team'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No team found.</CommandEmpty>
                        <CommandGroup>
                          {teams.map((team) => (
                            <CommandItem
                              value={team.team_name}
                              key={team.team_id}
                              onSelect={() => {
                                form.setValue('home_team', team.team_id)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  team.team_id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {team.team_name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="away_team"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fora</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? teams.find((team) => team.team_id === field.value)
                                ?.team_name
                            : 'Select the team'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No team found.</CommandEmpty>
                        <CommandGroup>
                          {teams.map((team) => (
                            <CommandItem
                              value={team.team_name}
                              key={team.team_id}
                              onSelect={() => {
                                form.setValue('away_team', team.team_id)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  team.team_id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {team.team_name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="competition"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Competição</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? competitions.find(
                                (competition) =>
                                  competition.competition_id === field.value,
                              )?.competition_name
                            : 'Select the team'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Competição..." />
                        <CommandEmpty>No competition found.</CommandEmpty>
                        <CommandGroup>
                          {competitions.map((competition) => (
                            <CommandItem
                              value={competition.competition_name}
                              key={competition.competition_id}
                              onSelect={() => {
                                form.setValue(
                                  'competition',
                                  competition.competition_id,
                                )
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  competition.competition_id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {competition.competition_name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="round"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Rodada</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? rounds.find(
                                (round) => round.round_id === field.value,
                              )?.round_name
                            : 'Select the round'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Competição..." />
                        <CommandEmpty>No competition found.</CommandEmpty>
                        <CommandGroup>
                          {rounds.map((round) => (
                            <CommandItem
                              value={round.round_name}
                              key={round.round_id}
                              onSelect={() => {
                                form.setValue('round', round.round_id)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  round.round_id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {round.round_name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="strategy"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Estrategia</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? strategies.find(
                                (strategy) =>
                                  strategy.strategy_id === field.value,
                              )?.strategy_name
                            : 'Select a strategy'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search strategy..." />
                        <CommandEmpty>No strategy found.</CommandEmpty>
                        <CommandGroup>
                          {strategies.map((strategy) => (
                            <CommandItem
                              value={strategy.strategy_name}
                              key={strategy.strategy_id}
                              onSelect={() => {
                                form.setValue('strategy', strategy.strategy_id)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  strategy.strategy_id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {strategy.strategy_name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="odd"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Odd</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[200px]"
                      placeholder="ex 1.50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="modal-action">
              <Button type="button" variant={'outline'}>
                Close
              </Button>
              {!isLoading ? (
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
