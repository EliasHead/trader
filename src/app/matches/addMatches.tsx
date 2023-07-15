'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import type { Competition, Teams } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Select, { MultiValue } from 'react-select'

type roundsType = {
  round_id: number
  round_name: number | string
}

type MatchesProps = {
  competitions: Competition[]
  teams: Teams[]
  rounds: roundsType[]
}

// TODO: migra array de estrategias
const strategies = [
  { label: 'F', value: 1 },
  { label: 'FD', value: 2 },
  { label: 'DNB', value: 3 },
  { label: '+1G', value: 4 },
]
// TODO: migra array de reviews
const reviews = [
  { label: 'race', value: 1 },
  { label: 'home', value: 2 },
  { label: 'way', value: 3 },
  { label: 'derby', value: 4 },
  { label: 'must-win', value: 4 },
]

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
    <div>
      <button className="btn bg-blue-500 text-white" onClick={handleModal}>
        Adicionar novo jogo
      </button>
      <div className={isOpen ? 'modal-open modal' : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar novo jogo</h3>
          <form onSubmit={handleSubmit}>
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
              <label className="label font-bold" htmlFor="home_team">
                Estrategias
              </label>
              <Select
                name="strategy"
                placeholder="Escola a estrategia estrategias"
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
                placeholder="Escola a estrategia estrategias"
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
                className="input-bordered input"
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
                className="input-bordered input"
                placeholder="stake ex: 10"
                aria-label="stake"
                onChange={handleChange}
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn-primary btn">
                  Save
                </button>
              ) : (
                <button type="button" className="loading btn">
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

export default AddMatches