import { ProgressBar } from '@/components/ui/progressBar'
import { prisma } from '@/utils/prisma'

export default async function Home() {
  // TODO: Filtrar resultados geral(parametro em andamento vazio)
  const matchesCount = await prisma.matches.groupBy({
    by: ['result'],
    _count: {
      result: true,
    },
    orderBy: [
      {
        result: 'desc',
      },
    ],
  })

  const [red, green, draw, progress] = matchesCount.map((matchCount) => ({
    count: matchCount._count.result | 0,
  }))

  console.log(
    'm',
    matchesCount,
    'r:',
    red,
    'g:',
    green,
    'd:',
    draw,
    'p:',
    progress,
  )

  const totalGreens = green.count
  const totalReds = red.count
  const totalDraws = draw.count
  const totalProgress = progress?.count | 0
  const totalMatches = totalGreens + totalReds + totalDraws + totalProgress

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
  const rateGreens = ((totalGreens / totalMatches) * 100).toFixed(0)
  const rateReds = ((totalReds / totalMatches) * 100).toFixed(0)
  const rateDraws = ((totalDraws / totalMatches) * 100).toFixed(0)

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
    <>
      <div className="relative m-auto mb-16 mt-16 hidden w-[95%] overflow-x-auto sm:inline-block sm:rounded-md">
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
      <div className="mt-16 grid grid-cols-1 gap-4 md:hidden">
        <div className="mt-4 space-y-3 rounded-lg bg-white p-4 font-semibold  shadow-lg">
          <div className="flex justify-around">
            <div className="flex gap-2">
              <div>Jogos:</div>
              <div>{totalMatches}</div>
            </div>
            <div className="flex gap-2">
              <div>Vitorias:</div>
              <div>{totalGreens}</div>
            </div>
          </div>

          <div className="flex justify-around">
            <div className="flex gap-2">
              <div>Derrotas:</div>
              <div>{totalReds}</div>
            </div>
            <div className="flex gap-2">
              <div>Empates:</div>
              <div>{totalDraws}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-lg bg-white p-4 font-semibold  shadow-lg">
          <span className="block text-center">Total dos resultados</span>
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
    </>
  )
}
