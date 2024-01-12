'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
  Competition,
  Results,
  Reviews,
  Strategies,
  Teams,
  Tickets,
} from '@prisma/client'
import { Pencil } from '@phosphor-icons/react'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
// import { strategies } from '@/utils/estrategies'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { MatchesType } from './types'

type roundsType = {
  round_id: number
  round_name: string
}

type MatchesProps = {
  competitions: Competition[]
  teams: Teams[]
  rounds: roundsType[]
  match: MatchesType
  results: Results[]
  tickets: Tickets[]
  strategies: Strategies[]
  reviews: Reviews[]
}

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
  result: z.number({
    required_error: 'Please select a round.',
  }),
  strategy: z.number({
    required_error: 'Please select a round.',
  }),
  odd: z.number({
    required_error: 'Please select a round.',
  }),
  home_goals: z.coerce.number({
    required_error: 'Please select a round.',
  }),
  away_goals: z.coerce.number({
    required_error: 'Please select a round.',
  }),
  ticket: z.number({
    required_error: 'Please select a round.',
  }),
  review: z.number({
    required_error: 'Please select a round.',
  }),
})

const UpdateMatch = ({
  match,
  teams,
  competitions,
  rounds,
  results,
  tickets,
  strategies,
  reviews,
}: MatchesProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleModal = () => {
    form.reset()
    setIsOpen(!isOpen)
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)

    await axios.patch(`/api/matches/${match.match_id}`, {
      home_team_id: data.home_team,
      home_goals: data.home_goals,
      visitor_team_id: data.away_team,
      visitor_goals: data.away_goals,
      competition_id: data.competition,
      round: data.round,
      result_id: data.result,
      ticketId: data.ticket,
      strategy_id: data.strategy,
      odd: data.odd,
      review_id: data.review,
    })

    setIsLoading(false)

    router.refresh()

    setIsOpen(false)

    // form.reset()
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  return (
    <div className="px-3 py-2">
      <Button size={'icon'} onClick={handleModal}>
        <Pencil size={24} />
      </Button>
      <div className={isOpen ? `modal modal-open z-0` : 'modal'}>
        <div className="modal-box sm:w-3/5 sm:max-w-none">
          <h3 className="text-center text-lg font-bold">
            Atualizar jogo {match.match_id}
          </h3>
          {/* <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="home_team">
                Time da casa
              </label>
              <select
                name="home_team"
                id="home_team"
                value={formData.home_team}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha o time</option>
                {teams.map((team) => {
                  return (
                    <option key={team.team_id} value={team.team_id}>
                      {team.team_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="home_goals">
                Gols time da casa
              </label>
              <input
                type="number"
                name="home_goals"
                id="home_goals"
                min="0"
                value={formData.home_goals}
                className="input input-bordered"
                placeholder="gols ex: 2"
                aria-label="gols time da casa"
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="visitor_team">
                Time visitante
              </label>
              <select
                name="visitor_team"
                id="visitor_team"
                value={formData.visitor_team}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha o time</option>
                {teams.map((team) => {
                  return (
                    <option key={team.team_id} value={team.team_id}>
                      {team.team_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="visitor_goals">
                Gols time visitante
              </label>
              <input
                type="number"
                name="visitor_goals"
                id="visitor_goals"
                min="0"
                value={formData.visitor_goals}
                className="input input-bordered"
                placeholder="gols ex: 2"
                aria-label="gols time da visitante"
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="competition">
                Competição
              </label>
              <select
                name="competition"
                id="competition"
                value={formData.competition!}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha a competição</option>
                {competitions.map((competition) => {
                  return (
                    <option
                      key={competition.competition_id}
                      value={competition.competition_id}
                    >
                      {competition.competition_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="round">
                Rodada
              </label>
              <select
                name="round"
                id="round"
                value={formData.round}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha a Rodada</option>
                {rounds.map((round) => {
                  return (
                    <option key={round.round_id} value={round.round_id}>
                      {round.round_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="result">
                Resultado
              </label>
              <select
                name="result"
                id="result"
                value={formData.result ? formData.result : ''}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha Resultado</option>
                {results.map((result) => {
                  return (
                    <option key={result.result_id} value={result.result_id}>
                      {result.result_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="ticket">
                Bilhete
              </label>
              <select
                name="ticket"
                id="ticket"
                value={formData.ticket!}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha o bilhete</option>
                {tickets.map((ticket) => {
                  return (
                    <option key={ticket.ticketId} value={ticket.ticketId}>
                      {ticket.ticketId}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Fechar
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Salva...
                </button>
              )}
            </div>
          </form> */}
          <Form {...form}>
            <form
              className="grid grid-cols-1 gap-2 space-x-4 space-y-4 sm:grid-cols-3 sm:items-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                defaultValue={match.home_team_id}
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
                              ? teams.find(
                                  (team) => team.team_id === field.value,
                                )?.team_name
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
                defaultValue={match.home_goals}
                control={form.control}
                name="home_goals"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Gols casa</FormLabel>
                    <FormControl>
                      <Input className="w-[200px]" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                defaultValue={match.visitor_team_id}
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
                              ? teams.find(
                                  (team) => team.team_id === field.value,
                                )?.team_name
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
                defaultValue={match.visitor_goals}
                control={form.control}
                name="away_goals"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Gols fora</FormLabel>
                    <FormControl>
                      <Input className="w-[200px]" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                defaultValue={match.competition_id}
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
                defaultValue={match.round}
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
                defaultValue={match.result?.result_id}
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Resultado</FormLabel>
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
                              ? results.find(
                                  (result) => result.result_id === field.value,
                                )?.result_name
                              : 'Select a resultado'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search strategy..." />
                          <CommandEmpty>No Result found.</CommandEmpty>
                          <CommandGroup>
                            {results.map((result) => (
                              <CommandItem
                                value={result.result_name}
                                key={result.result_id}
                                onSelect={() => {
                                  form.setValue('result', result.result_id)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    result.result_id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {result.result_name}
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
                defaultValue={match.ticketId!}
                control={form.control}
                name="ticket"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Bilhete</FormLabel>
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
                              ? tickets.find(
                                  (ticket) => ticket.ticketId === field.value,
                                )?.ticketId
                              : 'Select a ticket'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ticket..." />
                          <CommandEmpty>No bilhete found.</CommandEmpty>
                          <CommandGroup>
                            {tickets.map((ticket) => (
                              <CommandItem
                                // value={ticket.ticket_name!}
                                key={ticket.ticketId}
                                onSelect={() => {
                                  form.setValue('ticket', ticket.ticketId)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    ticket.ticketId === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {ticket.ticketId}
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
                defaultValue={match.strategy.strategy_id}
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
                                  form.setValue(
                                    'strategy',
                                    strategy.strategy_id,
                                  )
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
                  </FormItem>
                )}
              />
              <FormField
                defaultValue={match.odd!}
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
              <FormField
                defaultValue={match.review?.review_id}
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Revisão</FormLabel>
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
                              ? reviews.find(
                                  (review) => review.review_id === field.value,
                                )?.review_name
                              : 'Select a strategy'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search strategy..." />
                          <CommandEmpty>No review found.</CommandEmpty>
                          <CommandGroup>
                            {reviews.map((review) => (
                              <CommandItem
                                value={review.review_name}
                                key={review.review_id}
                                onSelect={() => {
                                  form.setValue('review', review.review_id)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    review.review_id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {review.review_name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-around">
                <Button type="submit">Atualizar</Button>
                <Button variant={'outline'} onClick={handleModal}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default UpdateMatch
