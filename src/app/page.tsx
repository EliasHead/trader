// import { ProgressBar } from '@/components/ui/progressBar'
// import { ProgressBar } from '@/components/ui/progressBar'
import { prisma } from '@/utils/prisma'

export default async function Home() {
  // TODO: Filtrar resultados geral
  const matchesCount = await prisma.matches.groupBy({
    by: ['result'],
    _count: {
      result: true,
    },
  })

  const [draw, green, progress, red] = matchesCount.map((matchCount) => ({
    count: matchCount._count.result,
  }))

  const totalGreens = green.count
  const totalReds = red.count
  const totalDraws = draw.count
  const totalProgress = progress.count
  const totalMatches = totalGreens + totalReds + totalDraws + totalProgress

  console.log(
    'draw',
    totalDraws,
    'green',
    totalGreens,
    'red',
    totalReds,
    'progress',
    totalProgress,
    'matches',
    totalMatches,
  )

  // // TODO: filtrar resultados por campeonanto
  // const matchesCountSerieB = await prisma.matches.count({
  //   where: {
  //     competition_id: {
  //       equals: 1,
  //     },
  //   },
  // })

  // const greensCountSerieB = await prisma.matches.count({
  //   where: {
  //     AND: {
  //       result: {
  //         equals: 'green',
  //       },
  //       competition_id: {
  //         equals: 1,
  //       },
  //     },
  //   },
  // })

  // const redsCountSerieB = await prisma.matches.count({
  //   where: {
  //     AND: {
  //       result: {
  //         equals: 'red',
  //       },
  //       competition_id: {
  //         equals: 1,
  //       },
  //     },
  //   },
  // })

  // const drawCountSerieB = await prisma.matches.count({
  //   where: {
  //     AND: {
  //       result: {
  //         equals: 'draw',
  //       },
  //       competition_id: {
  //         equals: 1,
  //       },
  //     },
  //   },
  // })

  // // FIXME: lembra o que é isso?
  // const processCount = await prisma.matches.count({
  //   where: {
  //     result: null,
  //   },
  // })

  // // TODO: porcentagem geral
  // const rateGreens = ((greensCount / matchesCount) * 100).toFixed(0)
  // const rateReds = ((redsCount / matchesCount) * 100).toFixed(0)
  // const rateDraws = ((drawCount / matchesCount) * 100).toFixed(0)

  // // TODO: porcentagem serie b
  // const rateGreensSerieB = (
  //   (greensCountSerieB / matchesCountSerieB) *
  //   100
  // ).toFixed(0)

  // const rateRedsSerieB = ((redsCountSerieB / matchesCountSerieB) * 100).toFixed(
  //   0,
  // )

  // const rateDrawsSerieB = (
  //   (drawCountSerieB / matchesCountSerieB) *
  //   100
  // ).toFixed(0)

  return (
    <div className="relative m-auto mb-16 mt-16 w-[95%] overflow-x-auto rounded-md">
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
      {/* <ProgressBar
        // rate={rateGreens}
        color="success"
        title="Porcentagem de vitorias"
      />

      <ProgressBar
        // rate={rateReds}
        color="red-600"
        title="Porcentagem de derotas"
      />

      <ProgressBar
        // rate={rateDraws}
        color="yellow-500"
        title="Porcentagem de empates"
      />

      <ProgressBar
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
  )
}
