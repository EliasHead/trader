import { prisma } from '@/utils/prisma'
import { AddLeverage } from './addLeverage'

export default async function Leverage() {
  const leverages = await prisma.leverage.findMany({
    orderBy: {
      leverageId: 'desc',
    },
  })

  return (
    <div className="container mx-auto mt-16 flex h-screen w-full flex-col items-center justify-start gap-4">
      <h1>
        <strong>Alavancagem</strong>
      </h1>
      <AddLeverage />
      <div className="grid w-full grid-cols-1 gap-4">
        {leverages.map((leverage) => {
          return (
            <div
              className="grid grid-cols-3 gap-4 border-b border-zinc-200"
              key={leverage.leverageId}
            >
              <div className="px-4 py-2">{leverage.leverageId}</div>
              <div className="px-4 py-2">{leverage.goal}</div>
              <div className="px-4 py-2">{leverage.result}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
