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
    </div>
  )
}
