'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import type { Competition, Teams } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Select, { MultiValue } from 'react-select'
import { strategies } from '@/utils/estrategies'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { FormAddMatch } from '@/components/forms/formAddMatch'

type roundsType = {
  round_id: number
  round_name: string
}

type MatchesProps = {
  competitions: Competition[]
  teams: Teams[]
  rounds: roundsType[]
}

// TODO: migra array de reviews
const reviews = [
  { label: 'race', value: 1 },
  { label: 'home', value: 2 },
  { label: 'way', value: 3 },
  { label: 'derby', value: 4 },
  { label: 'must-win', value: 5 },
  { label: 'bet', value: 6 },
  { label: '-FL+', value: 7 },
  { label: 'live', value: 8 },
  { label: 'cycles', value: 9 },
  { label: 'oscillation', value: 10 },
  { label: '+goal', value: 11 },
  { label: '-goal', value: 12 },
  { label: 'unknown', value: 13 },
] as const

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const FormSchema = z.object({
  home_team: z.number({
    required_error: "Please select a home team.",
  }),
  away_team: z.number({
    required_error: "Please select a away team.",
  }),
  competition: z.number({
    required_error: "Please select a competition.",
  }),
  round: z.number({
    required_error: "Please select a round.",
  }),
  strategy: z.number({
    required_error: "Please select a round.",
  }),
  reviews: z.number({
    required_error: "Please select a reviews.",
  }),
  odd: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  })
})

const AddMatches = ({ teams, competitions, rounds }: MatchesProps) => {
  const [formData, setFormData] = useState({
    home_team: '',
    visitor_team: '',
    competition: '',
    round: '',
    strategy: '',
    review: '',
    odd: '',
    stake: '',
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // event.preventDefault()
    console.log(data)
    setIsLoading(true)

    // await axios.post('/api/matches', {
    //   home_team_id: data.home_team,
    //   visitor_team_id: data.away_team,
    //   competition_id: data.competition,
    //   round: data.round,
    //   strategy: data.strategy,
    //   review: data.reviews,
    //   odd: data.odd,
    // })

    setIsLoading(false)

    setFormData({
      home_team: '',
      visitor_team: '',
      competition: '',
      round: '',
      strategy: '',
      review: '',
      odd: '',
      stake: '',
    })

    router.refresh()

    setIsOpen(false)

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const handleChange = async (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  // TODO: melhorar handleChange multiselect
  const handleChangeStrategy = async (
    event: MultiValue<{ label: string; value: number }>,
  ) => {
    const label = event.map((e) => e.label).toString()
    setFormData((prevState) => ({ ...prevState, strategy: label }))
  }

  const handleChangeReview = async (
    event: MultiValue<{ label: string; value: number }>,
  ) => {
    const label = event.map((e) => e.label).toString()
    setFormData((prevState) => ({ ...prevState, review: label }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    await axios.post('/api/matches', {
      home_team_id: formData.home_team,
      visitor_team_id: formData.visitor_team,
      competition_id: formData.competition,
      round: formData.round,
      strategy: formData.strategy,
      review: formData.review,
      odd: formData.odd,
      stake: formData.stake,
    })

    setIsLoading(false)

    setFormData({
      home_team: '',
      visitor_team: '',
      competition: '',
      round: '',
      strategy: '',
      review: '',
      odd: '',
      stake: '',
    })

    router.refresh()

    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    // TODO: alterar lagura da modal
    <div className="m-auto">
      <Button className="font-bold uppercase" size={"lg"} onClick={handleModal}>
        novo jogo
      </Button>
      <div className={isOpen ? "modal modal-open z-0" : "modal"}>
        <div className="modal-box sm:w-3/5 sm:max-w-none">
          <h3 className="text-lg font-bold">Adicionar novo jogo</h3>
          {/* <form className="grid grid-cols-3 gap-2" onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="home_team">
                Time da casa
              </label>
              <select
                name="home_team"
                id="home_team"
                value={formData.home_team}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha o time</option>
                {teams.map((team) => {
                  return (
                    <option key={team.team_id} value={team.team_id}>
                      {team.team_name}
                    </option>
                  );
                })}
              </select>
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
                  );
                })}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="competition">
                Competição
              </label>
              <select
                name="competition"
                id="competition"
                value={formData.competition}
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
                  );
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
                  );
                })}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="home_team">
                Estrategias
              </label>
              <Select
                name="strategy"
                placeholder="Escolha as estrategias"
                isMulti
                onChange={handleChangeStrategy}
                options={strategies}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="home_team">
                Revisão
              </label>
              <Select
                name="strategy"
                placeholder="Escolha as revisões"
                isMulti
                onChange={handleChangeReview}
                options={reviews}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="odd">
                Odd
              </label>
              <input
                type="number"
                name="odd"
                id="odd"
                min="0"
                step=".01"
                value={formData.odd}
                className="input input-bordered"
                placeholder="odd ex: 1.75"
                aria-label="odd?"
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="stake">
                Stake
              </label>
              <input
                type="number"
                name="stake"
                id="stake"
                min="0"
                value={formData.stake}
                className="input input-bordered"
                placeholder="stake ex: 10"
                aria-label="stake"
                onChange={handleChange}
              />
            </div>
            <div className="modal-action flex items-end">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form> */}
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="home_team"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Casa</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? teams.find(
                                  (team) => team.team_id === field.value
                                )?.team_name
                              : "Select the team"}
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
                                  form.setValue("home_team", team.team_id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    team.team_id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
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
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? teams.find(
                                  (team) => team.team_id === field.value
                                )?.team_name
                              : "Select the team"}
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
                                  form.setValue("away_team", team.team_id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    team.team_id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
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
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? competitions.find(
                                  (competition) =>
                                    competition.competition_id === field.value
                                )?.competition_name
                              : "Select the team"}
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
                                    "competition",
                                    competition.competition_id
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    competition.competition_id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
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
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? rounds.find(
                                  (round) => round.round_id === field.value
                                )?.round_name
                              : "Select the round"}
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
                                  form.setValue("round", round.round_id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    round.round_id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
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
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? strategies.find(
                                  (strategy) => strategy.value === field.value
                                )?.label
                              : "Select a strategy"}
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
                                value={strategy.label}
                                key={strategy.value}
                                onSelect={() => {
                                  form.setValue("strategy", strategy.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    strategy.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {strategy.label}
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
                name="reviews"
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
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? reviews.find(
                                  (review) => review.value === field.value
                                )?.label
                              : "Select a review"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No review found.</CommandEmpty>
                          <CommandGroup>
                            {reviews.map((review) => (
                              <CommandItem
                                value={review.label}
                                key={review.value}
                                onSelect={() => {
                                  form.setValue("reviews", review.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    review.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {review.label}
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
                name="odd"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Odd</FormLabel>
                    <FormControl>
                      <Input placeholder="ex 1.50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddMatches
