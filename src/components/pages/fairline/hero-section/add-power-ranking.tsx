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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Competition, Teams } from '@prisma/client'
import axios from 'axios'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const DATA_POSITION = [
  { positionId: 1, positionName: '1º' },
  { positionId: 2, positionName: '2º' },
  { positionId: 3, positionName: '3º' },
  { positionId: 4, positionName: '4º' },
  { positionId: 5, positionName: '5º' },
  { positionId: 6, positionName: '6º' },
  { positionId: 7, positionName: '7º' },
  { positionId: 8, positionName: '8º' },
  { positionId: 9, positionName: '9º' },
  { positionId: 10, positionName: '10º' },
  { positionId: 11, positionName: '11º' },
  { positionId: 12, positionName: '12º' },
  { positionId: 13, positionName: '13º' },
  { positionId: 14, positionName: '14º' },
  { positionId: 15, positionName: '15º' },
  { positionId: 16, positionName: '16º' },
  { positionId: 17, positionName: '17º' },
  { positionId: 18, positionName: '18º' },
  { positionId: 19, positionName: '19º' },
  { positionId: 20, positionName: '20º' },
]

type PowerRankingAdd = {
  teams: Teams[]
  competitions: Competition[]
}

const FormSchema = z.object({
  position: z.number({
    required_error: 'Please select a home team.',
  }),
  team: z.number({
    required_error: 'Please select a away team.',
  }),
  competition: z.number({
    required_error: 'Please select a competition.',
  }),
})

export const AddPowerRanking = ({ teams, competitions }: PowerRankingAdd) => {
  const [formData, setFormData] = useState({
    position: 0,
    team: 0,
    competition: 0,
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleChange = async (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    await axios.post('/api/power-rankings', {
      position: formData.position,
      teamId: formData.team,
      competitionId: formData.competition,
    })
    setIsLoading(false)
    setFormData({
      position: 0,
      team: 0,
      competition: 0,
    })
    router.refresh()
    setIsOpen(false)
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)

    await axios.post('/api/power-rankings', {
      position: data.position,
      teamId: data.team,
      competitionId: data.competition,
    })

    setIsLoading(false)

    router.refresh()

    setIsOpen(false)

    form.reset()
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
    form.reset()
  }

  return (
    <div className="flex items-center">
      <Button onClick={handleModal}>Adicionar</Button>
      <div className={isOpen ? 'modal modal-open z-50' : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar novo time</h3>
          <Form {...form}>
            <form
              className="grid grid-cols-1 gap-2 space-x-4 space-y-4 sm:items-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Posição</FormLabel>
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
                              ? DATA_POSITION.find(
                                  (position) =>
                                    position.positionId === field.value,
                                )?.positionName
                              : 'Selecione a posição'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Competição..." />
                          <CommandEmpty>No competition found.</CommandEmpty>
                          <CommandGroup>
                            {DATA_POSITION.map((position) => (
                              <CommandItem
                                value={position.positionName}
                                key={position.positionId}
                                onSelect={() => {
                                  form.setValue('position', position.positionId)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    position.positionId === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {position.positionName}
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
                name="team"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Time</FormLabel>
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
                          <CommandInput placeholder="Search Competição..." />
                          <CommandEmpty>No competition found.</CommandEmpty>
                          <CommandGroup>
                            {teams.map((team) => (
                              <CommandItem
                                value={team.team_name}
                                key={team.team_id}
                                onSelect={() => {
                                  form.setValue('team', team.team_id)
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
              {/* <div className="form-control w-full">
              <label className="label font-bold" htmlFor="position">
                Selecione á posição
              </label>
              <select
                name="position"
                id="position"
                value={formData.position}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                {DATA_POSITION.map((position) => {
                  return (
                    <option key={position.positionId} value={position.positionId}>
                      {position.positionName}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="team">
                Selecione o Time
              </label>
              <select
                name="team"
                id="team"
                value={formData.team}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
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
              <label className="label font-bold" htmlFor="competition">
                Selecione á competição
              </label>
              <select
                name="competition"
                id="competition"
                value={formData.competition}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                {competitions.map((competition) => {
                  return (
                    <option key={competition.competition_id} value={competition.competition_id}>
                      {competition.competition_name}
                    </option>
                  )
                })}
              </select>
            </div> */}

              <div className="modal-action">
                <Button type="button" variant={'outline'} onClick={handleModal}>
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
        </div>
      </div>
    </div>
  )
}
