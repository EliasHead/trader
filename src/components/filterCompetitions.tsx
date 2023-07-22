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

  const reds = matches.filter((red) =>
    competiton
      ? red.result === 'red' && red.competition_id === competiton
      : red.result === 'red',
  )

  const greens = matches.filter((match) =>
    competiton
      ? match.result === 'green' && match.competition_id === competiton
      : match.result === 'green',
  )

  const draws = matches.filter((match) =>
    competiton
      ? match.result === 'draw' && match.competition_id === competiton
      : match.result === 'draw',
  )

  const progress = matches.filter((match) =>
    competiton
      ? match.result === '_progress' && match.competition_id === competiton
      : match.result === '_progress',
  )

  const totalGreens = Number(greens.length)
  const totalReds = Number(reds.length)
  const totalDraws = Number(draws.length)
  const totalProgress = Number(progress.length)
  const totalMatches = totalGreens + totalReds + totalDraws + totalProgress

  const rateGreens = ((totalGreens / totalMatches) * 100).toFixed(0)
  const rateReds = ((totalReds / totalMatches) * 100).toFixed(0)
  const rateDraws = ((totalDraws / totalMatches) * 100).toFixed(0)

  const handleChang = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setCompetition(Number(event.target.value))
  }

  return (
    <div>
      <div className="relative m-auto mb-16 mt-16 hidden w-[95%] items-center overflow-x-auto sm:flex sm:flex-col sm:rounded-md">
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
              <td className="px-6 py-4">{totalGreens}</td>
              <td className="px-6 py-4">{totalDraws}</td>
              <td className="px-6 py-4">{totalReds}</td>
              <td className="px-6 py-4">{totalProgress}</td>
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

        {/* <ProgressBar
        // rate={rateGreensSerieB}
        color="success"
        title="Porcentagem de vitorias"
      /> */}

        {/* <ProgressBar
        // rate={rateRedsSerieB}
        color="red-600"
        title="Porcentagem de derotas"
      /> */}

        {/* <ProgressBar
        // rate={rateDrawsSerieB}
        color="yellow-500"
        title="Porcentagem de empates"
      /> */}
      </div>
    </div>
  )
}
