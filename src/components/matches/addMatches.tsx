'use client'

import { createMatches } from '@/utils/createMatches'
import { ChangeEvent, FormEvent, useState } from 'react'

export function AddMatches({ teams, competitions, rounds }: any) {
  const [formData, setFormData] = useState({
    home_team: '',
    visitor_team: '',
    competition: '',
    round: '',
  })
  console.log(teams)

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    createMatches(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl">
      <div className="mx-3 mb-6 flex flex-col items-center border-b border-teal-500 py-2 sm:flex-row sm:items-end">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="home_team"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
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
            {teams.map((team: any) => {
              return (
                <option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </option>
              )
            })}
          </select>
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="visitor_team"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
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
            {teams.map((team: any) => {
              return (
                <option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </option>
              )
            })}
          </select>
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="competition"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
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
            {competitions.map((competition: any) => {
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
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="round"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
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
            {rounds.map((round: any) => {
              return (
                <option key={round.round_id} value={round.round_id}>
                  {round.round_name}
                </option>
              )
            })}
          </select>
        </div>
        <button
          className="text-md mt-2 flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 font-bold  text-white hover:border-teal-700 hover:bg-teal-700"
          type="submit"
        >
          Adicionar
        </button>
      </div>
    </form>
  )
}
