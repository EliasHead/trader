'use client'
import { useEffect, useState } from 'react'
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
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
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
import { dataRounds } from '@/utils/rounds'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type MatchesProps = {
  match: MatchesType
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

type CreateMatchSchema = z.infer<typeof FormSchema>

const UpdateMatch = ({ match }: MatchesProps) => {
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const [teams, setTeams] = useState<Teams[]>([])
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [results, setResults] = useState<Results[]>([])
  const [tickets, setTickets] = useState<Tickets[]>([])
  const [strategies, setStrategies] = useState<Strategies[]>([])
  const [reviews, setReviews] = useState<Reviews[]>([])
  const rounds = dataRounds

  useEffect(() => {
    fetch('/api/teams')
      .then((res) => res.json())
      .then((data) => {
        setTeams(data)
        // setLoading(false)
      })

    fetch('/api/competitions')
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data)
        // setLoading(false)
      })

    fetch('/api/results')
      .then((res) => res.json())
      .then((data) => {
        setResults(data)
        // setLoading(false)
      })

    fetch('/api/tickets')
      .then((res) => res.json())
      .then((data) => {
        setTickets(data)
        // setLoading(false)
      })

    fetch('/api/strategies')
      .then((res) => res.json())
      .then((data) => {
        setStrategies(data)
        // setLoading(false)
      })

    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data)
        // setLoading(false)
      })
  }, [])

  const router = useRouter()

  async function onSubmit(data: CreateMatchSchema) {
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
    setOpen(!open)
    router.refresh()

    // form.reset()
  }

  const form = useForm<CreateMatchSchema>({
    resolver: zodResolver(FormSchema),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start self-start px-2 text-popover-foreground hover:bg-background/50 hover:no-underline"
          variant="link"
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Editar a partida {match.match_id}</DialogTitle>
        </DialogHeader>
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
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              defaultValue={match.competition_id!}
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
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
              defaultValue={match.strategy?.strategy_id}
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
                </FormItem>
              )}
            />
            <FormField
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
            <div className="modal-action">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              {!isLoading ? (
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
    // <div className="px-3 py-2">

    //   <Button size={'icon'} onClick={handleModal}>
    //     <Pencil size={24} />
    //   </Button>
    //   <div className={isOpen ? `modal modal-open z-0` : 'modal'}>
    //     <div className="modal-box sm:w-3/5 sm:max-w-none">
    //       <h3 className="text-center text-lg font-bold">
    //         Atualizar jogo {match.match_id}
    //       </h3>
    //       <Form {...form}>
    //         <form
    //           className="grid grid-cols-1 gap-2 space-x-4 space-y-4 sm:grid-cols-3 sm:items-center"
    //           onSubmit={form.handleSubmit(onSubmit)}
    //         >
    //           <FormField
    //             defaultValue={match.home_team_id}
    //             control={form.control}
    //             name="home_team"
    //             render={({ field }) => (
    //               <FormItem className="ml-4 mt-4 flex flex-col">
    //                 <FormLabel>Casa</FormLabel>
    //                 <Popover>
    //                   <PopoverTrigger asChild>
    //                     <FormControl>
    //                       <Button
    //                         variant="outline"
    //                         role="combobox"
    //                         className={cn(
    //                           'w-[200px] justify-between',
    //                           !field.value && 'text-muted-foreground',
    //                         )}
    //                       >
    //                         {field.value
    //                           ? teams.find(
    //                               (team) => team.team_id === field.value,
    //                             )?.team_name
    //                           : 'Select the team'}
    //                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                       </Button>
    //                     </FormControl>
    //                   </PopoverTrigger>
    //                   <PopoverContent className="w-[200px] p-0">
    //                     <Command>
    //                       <CommandInput placeholder="Search language..." />
    //                       <CommandEmpty>No team found.</CommandEmpty>
    //                       <CommandGroup>
    //                         {teams.map((team) => (
    //                           <CommandItem
    //                             value={team.team_name}
    //                             key={team.team_id}
    //                             onSelect={() => {
    //                               form.setValue('home_team', team.team_id)
    //                             }}
    //                           >
    //                             <Check
    //                               className={cn(
    //                                 'mr-2 h-4 w-4',
    //                                 team.team_id === field.value
    //                                   ? 'opacity-100'
    //                                   : 'opacity-0',
    //                               )}
    //                             />
    //                             {team.team_name}
    //                           </CommandItem>
    //                         ))}
    //                       </CommandGroup>
    //                     </Command>
    //                   </PopoverContent>
    //                 </Popover>
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             defaultValue={match.home_goals}
    //             control={form.control}
    //             name="home_goals"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Gols casa</FormLabel>
    //                 <FormControl>
    //                   <Input className="w-[200px]" placeholder="1" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             defaultValue={match.visitor_team_id}
    //             control={form.control}
    //             name="away_team"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Fora</FormLabel>
    //                 <Popover>
    //                   <PopoverTrigger asChild>
    //                     <FormControl>
    //                       <Button
    //                         variant="outline"
    //                         role="combobox"
    //                         className={cn(
    //                           'w-[200px] justify-between',
    //                           !field.value && 'text-muted-foreground',
    //                         )}
    //                       >
    //                         {field.value
    //                           ? teams.find(
    //                               (team) => team.team_id === field.value,
    //                             )?.team_name
    //                           : 'Select the team'}
    //                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                       </Button>
    //                     </FormControl>
    //                   </PopoverTrigger>
    //                   <PopoverContent className="w-[200px] p-0">
    //                     <Command>
    //                       <CommandInput placeholder="Search language..." />
    //                       <CommandEmpty>No team found.</CommandEmpty>
    //                       <CommandGroup>
    //                         {teams.map((team) => (
    //                           <CommandItem
    //                             value={team.team_name}
    //                             key={team.team_id}
    //                             onSelect={() => {
    //                               form.setValue('away_team', team.team_id)
    //                             }}
    //                           >
    //                             <Check
    //                               className={cn(
    //                                 'mr-2 h-4 w-4',
    //                                 team.team_id === field.value
    //                                   ? 'opacity-100'
    //                                   : 'opacity-0',
    //                               )}
    //                             />
    //                             {team.team_name}
    //                           </CommandItem>
    //                         ))}
    //                       </CommandGroup>
    //                     </Command>
    //                   </PopoverContent>
    //                 </Popover>
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             defaultValue={match.visitor_goals}
    //             control={form.control}
    //             name="away_goals"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Gols fora</FormLabel>
    //                 <FormControl>
    //                   <Input className="w-[200px]" placeholder="0" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //             defaultValue={match.competition_id!}
    //             control={form.control}
    //             name="competition"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Competição</FormLabel>
    //                 <Popover>
    //                   <PopoverTrigger asChild>
    //                     <FormControl>
    //                       <Button
    //                         variant="outline"
    //                         role="combobox"
    //                         className={cn(
    //                           'w-[200px] justify-between',
    //                           !field.value && 'text-muted-foreground',
    //                         )}
    //                       >
    //                         {field.value
    //                           ? competitions.find(
    //                               (competition) =>
    //                                 competition.competition_id === field.value,
    //                             )?.competition_name
    //                           : 'Select the team'}
    //                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                       </Button>
    //                     </FormControl>
    //                   </PopoverTrigger>
    //                   <PopoverContent className="w-[200px] p-0">
    //                     <Command>
    //                       <CommandInput placeholder="Search Competição..." />
    //                       <CommandEmpty>No competition found.</CommandEmpty>
    //                       <CommandGroup>
    //                         {competitions.map((competition) => (
    //                           <CommandItem
    //                             value={competition.competition_name}
    //                             key={competition.competition_id}
    //                             onSelect={() => {
    //                               form.setValue(
    //                                 'competition',
    //                                 competition.competition_id,
    //                               )
    //                             }}
    //                           >
    //                             <Check
    //                               className={cn(
    //                                 'mr-2 h-4 w-4',
    //                                 competition.competition_id === field.value
    //                                   ? 'opacity-100'
    //                                   : 'opacity-0',
    //                               )}
    //                             />
    //                             {competition.competition_name}
    //                           </CommandItem>
    //                         ))}
    //                       </CommandGroup>
    //                     </Command>
    //                   </PopoverContent>
    //                 </Popover>
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             defaultValue={match.round}
    //             control={form.control}
    //             name="round"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Rodada</FormLabel>
    //                 <Popover>
    //                   <PopoverTrigger asChild>
    //                     <FormControl>
    //                       <Button
    //                         variant="outline"
    //                         role="combobox"
    //                         className={cn(
    //                           'w-[200px] justify-between',
    //                           !field.value && 'text-muted-foreground',
    //                         )}
    //                       >
    //                         {field.value
    //                           ? rounds.find(
    //                               (round) => round.round_id === field.value,
    //                             )?.round_name
    //                           : 'Select the round'}
    //                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                       </Button>
    //                     </FormControl>
    //                   </PopoverTrigger>
    //                   <PopoverContent className="w-[200px] p-0">
    //                     <Command>
    //                       <CommandInput placeholder="Search Competição..." />
    //                       <CommandEmpty>No competition found.</CommandEmpty>
    //                       <CommandGroup>
    //                         {rounds.map((round) => (
    //                           <CommandItem
    //                             value={round.round_name}
    //                             key={round.round_id}
    //                             onSelect={() => {
    //                               form.setValue('round', round.round_id)
    //                             }}
    //                           >
    //                             <Check
    //                               className={cn(
    //                                 'mr-2 h-4 w-4',
    //                                 round.round_id === field.value
    //                                   ? 'opacity-100'
    //                                   : 'opacity-0',
    //                               )}
    //                             />
    //                             {round.round_name}
    //                           </CommandItem>
    //                         ))}
    //                       </CommandGroup>
    //                     </Command>
    //                   </PopoverContent>
    //                 </Popover>
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             defaultValue={match.result?.result_id}
    //             control={form.control}
    //             name="result"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Resultado</FormLabel>
    //                 <Popover>
    //                   <PopoverTrigger asChild>
    //                     <FormControl>
    //                       <Button
    //                         variant="outline"
    //                         role="combobox"
    //                         className={cn(
    //                           'w-[200px] justify-between',
    //                           !field.value && 'text-muted-foreground',
    //                         )}
    //                       >
    //                         {field.value
    //                           ? results.find(
    //                               (result) => result.result_id === field.value,
    //                             )?.result_name
    //                           : 'Select a resultado'}
    //                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                       </Button>
    //                     </FormControl>
    //                   </PopoverTrigger>
    //                   <PopoverContent className="w-[200px] p-0">
    //                     <Command>
    //                       <CommandInput placeholder="Search strategy..." />
    //                       <CommandEmpty>No Result found.</CommandEmpty>
    //                       <CommandGroup>
    //                         {results.map((result) => (
    //                           <CommandItem
    //                             value={result.result_name}
    //                             key={result.result_id}
    //                             onSelect={() => {
    //                               form.setValue('result', result.result_id)
    //                             }}
    //                           >
    //                             <Check
    //                               className={cn(
    //                                 'mr-2 h-4 w-4',
    //                                 result.result_id === field.value
    //                                   ? 'opacity-100'
    //                                   : 'opacity-0',
    //                               )}
    //                             />
    //                             {result.result_name}
    //                           </CommandItem>
    //                         ))}
    //                       </CommandGroup>
    //                     </Command>
    //                   </PopoverContent>
    //                 </Popover>
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //             defaultValue={match.ticketId!}
    //             control={form.control}
    //             name="ticket"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Bilhete</FormLabel>
    //                 <Popover>
    //                   <PopoverTrigger asChild>
    //                     <FormControl>
    //                       <Button
    //                         variant="outline"
    //                         role="combobox"
    //                         className={cn(
    //                           'w-[200px] justify-between',
    //                           !field.value && 'text-muted-foreground',
    //                         )}
    //                       >
    //                         {field.value
    //                           ? tickets.find(
    //                               (ticket) => ticket.ticketId === field.value,
    //                             )?.ticketId
    //                           : 'Select a ticket'}
    //                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                       </Button>
    //                     </FormControl>
    //                   </PopoverTrigger>
    //                   <PopoverContent className="w-[200px] p-0">
    //                     <Command>
    //                       <CommandInput placeholder="Search ticket..." />
    //                       <CommandEmpty>No bilhete found.</CommandEmpty>
    //                       <CommandGroup>
    //                         {tickets.map((ticket) => (
    //                           <CommandItem
    //                             // value={ticket.ticket_name!}
    //                             key={ticket.ticketId}
    //                             onSelect={() => {
    //                               form.setValue('ticket', ticket.ticketId)
    //                             }}
    //                           >
    //                             <Check
    //                               className={cn(
    //                                 'mr-2 h-4 w-4',
    //                                 ticket.ticketId === field.value
    //                                   ? 'opacity-100'
    //                                   : 'opacity-0',
    //                               )}
    //                             />
    //                             {ticket.ticketId}
    //                           </CommandItem>
    //                         ))}
    //                       </CommandGroup>
    //                     </Command>
    //                   </PopoverContent>
    //                 </Popover>
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             defaultValue={match.strategy.strategy_id}
    //             control={form.control}
    //             name="strategy"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Estrategia</FormLabel>
    //                 <Popover>
    //                   <PopoverTrigger asChild>
    //                     <FormControl>
    //                       <Button
    //                         variant="outline"
    //                         role="combobox"
    //                         className={cn(
    //                           'w-[200px] justify-between',
    //                           !field.value && 'text-muted-foreground',
    //                         )}
    //                       >
    //                         {field.value
    //                           ? strategies.find(
    //                               (strategy) =>
    //                                 strategy.strategy_id === field.value,
    //                             )?.strategy_name
    //                           : 'Select a strategy'}
    //                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                       </Button>
    //                     </FormControl>
    //                   </PopoverTrigger>
    //                   <PopoverContent className="w-[200px] p-0">
    //                     <Command>
    //                       <CommandInput placeholder="Search strategy..." />
    //                       <CommandEmpty>No strategy found.</CommandEmpty>
    //                       <CommandGroup>
    //                         {strategies.map((strategy) => (
    //                           <CommandItem
    //                             value={strategy.strategy_name}
    //                             key={strategy.strategy_id}
    //                             onSelect={() => {
    //                               form.setValue(
    //                                 'strategy',
    //                                 strategy.strategy_id,
    //                               )
    //                             }}
    //                           >
    //                             <Check
    //                               className={cn(
    //                                 'mr-2 h-4 w-4',
    //                                 strategy.strategy_id === field.value
    //                                   ? 'opacity-100'
    //                                   : 'opacity-0',
    //                               )}
    //                             />
    //                             {strategy.strategy_name}
    //                           </CommandItem>
    //                         ))}
    //                       </CommandGroup>
    //                     </Command>
    //                   </PopoverContent>
    //                 </Popover>
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //             defaultValue={match.odd!}
    //             control={form.control}
    //             name="odd"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Odd</FormLabel>
    //                 <FormControl>
    //                   <Input
    //                     className="w-[200px]"
    //                     placeholder="ex 1.50"
    //                     {...field}
    //                   />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             defaultValue={match.review?.review_id}
    //             control={form.control}
    //             name="review"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col">
    //                 <FormLabel>Revisão</FormLabel>
    //                 <Popover>
    //                   <PopoverTrigger asChild>
    //                     <FormControl>
    //                       <Button
    //                         variant="outline"
    //                         role="combobox"
    //                         className={cn(
    //                           'w-[200px] justify-between',
    //                           !field.value && 'text-muted-foreground',
    //                         )}
    //                       >
    //                         {field.value
    //                           ? reviews.find(
    //                               (review) => review.review_id === field.value,
    //                             )?.review_name
    //                           : 'Select a strategy'}
    //                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                       </Button>
    //                     </FormControl>
    //                   </PopoverTrigger>
    //                   <PopoverContent className="w-[200px] p-0">
    //                     <Command>
    //                       <CommandInput placeholder="Search strategy..." />
    //                       <CommandEmpty>No review found.</CommandEmpty>
    //                       <CommandGroup>
    //                         {reviews.map((review) => (
    //                           <CommandItem
    //                             value={review.review_name}
    //                             key={review.review_id}
    //                             onSelect={() => {
    //                               form.setValue('review', review.review_id)
    //                             }}
    //                           >
    //                             <Check
    //                               className={cn(
    //                                 'mr-2 h-4 w-4',
    //                                 review.review_id === field.value
    //                                   ? 'opacity-100'
    //                                   : 'opacity-0',
    //                               )}
    //                             />
    //                             {review.review_name}
    //                           </CommandItem>
    //                         ))}
    //                       </CommandGroup>
    //                     </Command>
    //                   </PopoverContent>
    //                 </Popover>
    //               </FormItem>
    //             )}
    //           />
    //           <div className="flex items-center justify-around">
    //             <Button type="submit">Atualizar</Button>
    //             <Button variant={'outline'} onClick={handleModal}>
    //               Cancelar
    //             </Button>
    //           </div>
    //         </form>
    //       </Form>
    //     </div>
    //   </div>
    // </div>
  )
}

export default UpdateMatch
