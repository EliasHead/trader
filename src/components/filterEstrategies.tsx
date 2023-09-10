'use client'
import { Matches } from '@prisma/client'
import { ChangeEvent, useState } from 'react'
import { ProgressBar } from './ui/progressBar'
import { strategies } from '@/utils/estrategies'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
export const FilterEstrategies = ({ matches }: { matches: Matches[] }) => {
  const [param, setParam] = useState('F')
  // F - Favorito
  const greens = matches.filter((item) => {
    const strategySplit = item.strategy?.split(',')

    return strategySplit?.includes(param) && item.result === 'green'
  }).length

  const reds = matches.filter((item) => {
    const strategySplit = item.strategy?.split(',')

    return strategySplit?.includes(param) && item.result === 'red'
  }).length

  const draws = matches.filter((item) => {
    const strategySplit = item.strategy?.split(',')

    return strategySplit?.includes(param) && item.result === 'draw'
  }).length

  const progress = matches.filter((item) => {
    const strategySplit = item.strategy?.split(',')

    return strategySplit?.includes(param) && item.result === 'progress'
  }).length

  const totalMatches = greens + reds + draws + progress

  const rateGreens = (((greens / totalMatches) * 100) | 0).toFixed(0)
  const rateReds = (((reds / totalMatches) * 100) | 0).toFixed(0)
  const rateDraws = (((draws / totalMatches) * 100) | 0).toFixed(0)

  const handleChang = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setParam(event.target.value)
  }

  return (
    <div className="mt-2 whitespace-nowrap p-2">
      <form className="mb-4 sm:w-1/2">
        <div className="form-control items-center sm:flex sm:flex-col">
          <label className="label font-bold" htmlFor="home_team">
            Filtrar por Estrategia
          </label>
          <select
            name="home_team"
            id="home_team"
            value={param}
            className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={handleChang}
          >
            {strategies?.map((strategy) => {
              return (
                <option key={strategy.value} value={strategy.label}>
                  {strategy.label}
                </option>
              )
            })}
          </select>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jogos</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMatches}</div>
            <p className="text-xs text-muted-foreground">
              total de jogos realizados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vitorias</CardTitle>
            <ArrowUp size={24} color="#16a34a" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{greens}</div>
            <p className="text-xs text-muted-foreground">
              total de jogos ganhos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empates</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draws}</div>
            <p className="text-xs text-muted-foreground">
              total de jogos empatados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Derrotas</CardTitle>
            <ArrowDown size={24} color="#dc2626" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{reds}</div>
            <p className="text-xs text-muted-foreground">
              total de jogos perdidos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Andamento</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress}</div>
            <p className="whitespace-nowrap text-xs text-muted-foreground">
              total de jogos em andamento
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
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
  )
}
