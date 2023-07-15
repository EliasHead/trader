import { prisma } from '@/utils/prisma'

export default async function Home() {
  const matchesCount = await prisma.matches.count()

  const greensCount = await prisma.matches.count({
    where: {
      result: 'green',
    },
  })

  const redsCount = await prisma.matches.count({
    where: {
      result: 'red',
    },
  })
  const drawCount = await prisma.matches.count({
    where: {
      result: 'draw',
    },
  })

  const processCount = await prisma.matches.count({
    where: {
      result: null,
    },
  })

  const rateGreens = ((greensCount / matchesCount) * 100).toFixed(0)
  const rateReds = ((redsCount / matchesCount) * 100).toFixed(0)
  const rateDraws = ((drawCount / matchesCount) * 100).toFixed(0)

  return (
    <div className="relative mt-16 overflow-x-auto rounded-md">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
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
            <td className="px-6 py-4">{matchesCount}</td>
            <td className="px-6 py-4">{greensCount}</td>
            <td className="px-6 py-4">{drawCount}</td>
            <td className="px-6 py-4">{redsCount}</td>
            <td className="px-6 py-4">{processCount}</td>
          </tr>
        </tbody>
      </table>
      <h4 className="mb-5 mt-10 text-center">Porcentagem de vitorias</h4>
      <div className="m-auto w-[80%] bg-neutral-200 dark:bg-neutral-600">
        <div
          id="vitorias"
          className="bg-success p-0.5 text-center text-sm font-bold leading-none text-white"
          style={{ width: rateGreens + '%' }}
        >
          {rateGreens}%
        </div>
      </div>
      <h4 className="mb-5 mt-10 text-center">Porcentagem de derotas</h4>
      <div className="m-auto w-[80%] bg-neutral-200 dark:bg-neutral-600">
        <div
          id="vitorias"
          className="bg-red-600 p-0.5 text-center text-sm font-bold leading-none text-white"
          style={{ width: rateReds + '%' }}
        >
          {rateReds}%
        </div>
      </div>
      <h4 className="mb-5 mt-10 text-center">Porcentagem de empates</h4>
      <div className="m-auto w-[80%] bg-neutral-200 dark:bg-neutral-600">
        <div
          id="vitorias"
          className="bg-yellow-500 p-0.5 text-center text-sm font-bold leading-none text-white"
          style={{ width: rateDraws + '%' }}
        >
          {rateDraws}%
        </div>
      </div>
    </div>
  )
}
