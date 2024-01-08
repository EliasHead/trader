'use client'
import { Button } from '@/components/ui/button'
import { Competition, Teams } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

const DATA_POSITION = [
  { positionId: 1, positionName: '1º' },
  { positionId: 2, positionName: '2º' },
  { positionId: 3, positionName: '3º' },
  { positionId: 4, positionName: '4º' },
  { positionId: 5, positionName: '5º' },
  { positionId: 6, positionName: '6º' },
  { positionId: 4, positionName: '7º' },
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

export const PowerRankingAdd = ({ teams, competitions }: PowerRankingAdd) => {
  const [formData, setFormData] = useState({
    position: 0,
    team: 0,
    competition: 0,
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

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

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex items-center">
      <Button className="uppercase" onClick={handleModal} size={'lg'}>
        Adicionar power ranking
      </Button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar novo time</h3>
          <form onSubmit={handleSubmit}>
            
            <div className="form-control w-full">
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
            </div>

            <div className="modal-action">
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
          </form>
        </div>
      </div>
    </div>
  )
}
