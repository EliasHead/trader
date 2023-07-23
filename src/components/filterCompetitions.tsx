'use client'
import { Matches, Competition } from '@prisma/client'
import React, { ChangeEvent, useState } from 'react'
import { ProgressBar } from './ui/progressBar'

type CountPerCompetitionType = {
  matches: Matches[]
  competitions: Competition[]
}

export const FilterCompetitions = ({
  matches,
  competitions,
}: CountPerCompetitionType) => {
  const [competiton, setCompetition] = useState(0)

  const reds = matches.filter((match) =>
    competiton
      ? match.result === 'red' && match.competition_id === competiton
      : match.result === 'red',
  ).length

  const greens = matches.filter((match) =>
    competiton
      ? match.result === 'green' && match.competition_id === competiton
      : match.result === 'green',
  ).length

  const draws = matches.filter((match) =>
    competiton
      ? match.result === 'draw' && match.competition_id === competiton
      : match.result === 'draw',
  ).length

  const progress = matches.filter((match) =>
    competiton
      ? match.result === 'progress' && match.competition_id === competiton
      : match.result === 'progress',
  ).length

  const totalMatches = greens + reds + draws + progress

  const rateGreens = ((greens / totalMatches) * 100).toFixed(0)
  const rateReds = ((reds / totalMatches) * 100).toFixed(0)
  const rateDraws = ((draws / totalMatches) * 100).toFixed(0)

  const handleChang = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setCompetition(Number(event.target.value))
  }

  return (
    <div>
      <div className="relative m-auto mb-16 mt-16 w-[95%] items-center overflow-x-auto sm:flex sm:flex-col sm:rounded-md">
        <form className="mb-4 w-4/12">
          <div className="form-control w-full items-center sm:flex sm:flex-col">
            <label className="label font-bold" htmlFor="home_team">
              Filtrar por competição
            </label>
            <select
              name="home_team"
              id="home_team"
              value={competiton}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={handleChang}
            >
              <option>Geral</option>
              {competitions?.map((competition) => {
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
        </form>
        <table className="w-full bg-white text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Jogos
              </th>
              <th scope="col" className="px-6 py-3">
                Vitorias
              </th>
              <th scope="col" className="px-6 py-3">
                Empates
              </th>
              <th scope="col" className="px-6 py-3">
                Derotas
              </th>
              <th scope="col" className="px-6 py-3">
                Em andamento
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-6 py-4">{totalMatches}</td>
              <td className="px-6 py-4">{greens}</td>
              <td className="px-6 py-4">{draws}</td>
              <td className="px-6 py-4">{reds}</td>
              <td className="px-6 py-4">{progress}</td>
            </tr>
          </tbody>
        </table>
        <div className="w-full">
          <ProgressBar
            rate={rateGreens}
            bgColor="bg-green-600"
            title="Porcentagem de vitorias"
          />

          <ProgressBar
            rate={rateReds}
            bgColor="bg-red-600"
            title="Porcentagem de derotas"
          />

          <ProgressBar
            rate={rateDraws}
            bgColor="bg-orange-600"
            title="Porcentagem de derotas"
          />
        </div>
      </div>
    </div>
  )
}
