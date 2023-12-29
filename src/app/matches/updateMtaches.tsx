'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Competition, Results, Teams } from '@prisma/client'
import { Pencil } from '@phosphor-icons/react'

type roundsType = {
  round_id: number
  round_name: number | string
}

type Match = {
  match_id: number
  home_goals: number
  visitor_goals: number
  home_team_id: number
  visitor_team_id: number
  result: {
    result_id: number;
    result_name: string;
  } | null;
  competition_id?: number
  competition: {
    competition_name: string
  } | null
  round: number
  home_team: {
    team_name: string
  }
  visitor_team: {
    team_name: string
  }
  ticketId?: number | null
  ticket: {
    result: string | null
  } | null
}

// type Results = {
//   result_id: number
//   label: string
// }

type Tickets = {
  ticketId: number
  result: string | null
}

type MatchesProps = {
  competitions: Competition[]
  teams: Teams[]
  rounds: roundsType[]
  match: Match
  results: Results[]
  tickets: Tickets[]
}

const UpdateMatch = ({
  match,
  teams,
  competitions,
  rounds,
  results,
  tickets,
}: MatchesProps) => {
  const [formData, setFormData] = useState({
    home_team: match.home_team_id,
    home_goals: match.home_goals,
    visitor_team: match.visitor_team_id,
    visitor_goals: match.visitor_goals,
    competition: match.competition_id,
    round: match.round,
    result: match.result?.result_id,
    ticket: match.ticketId,
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

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)
    await axios.patch(`/api/matches/${match.match_id}`, {
      home_team_id: formData.home_team,
      home_goals: formData.home_goals,
      visitor_team_id: formData.visitor_team,
      visitor_goals: formData.visitor_goals,
      competition_id: formData.competition,
      round: formData.round,
      result_id: formData.result,
      ticketId: formData.ticket,
    })
    setIsLoading(false)
    router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="px-3 py-2">
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        <Pencil size={24} />
      </button>
      <div className={isOpen ? `modal modal-open` : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Atualizar jogo {match.match_id}</h3>
          <form onSubmit={handleUpdate}>
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateMatch
