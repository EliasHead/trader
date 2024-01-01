import { db as prisma } from '@/lib/db'
import { AddLeverage } from './addLeverage'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default async function Leverage() {
  const leverages = await prisma.leverage.findMany({
    include: {
      Tickets: {
        select: {
          ticketId: true,
        },
      },
      Matches: {
        select: {
          match_id: true
        }
      }
    },
    orderBy: {
      leverageId: 'desc',
    },
  })

  return (
    <div className="mt-16 grid grid-cols-1 items-center space-y-4">
      <div className="m-auto">
        <AddLeverage />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 px-2">
        <Card className="w-full sm:m-auto sm:w-1/2">
          <CardHeader>
            <CardTitle>Alavancagens</CardTitle>
            <CardDescription>
              Uso do metodo de ciclos para crescimento da banca.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {leverages.map((leverage) => {
              return (
                <div key={leverage.leverageId}>
                  <div className="grid grid-cols-5 items-center justify-between gap-1 sm:grid-cols-8">
                    <div className="col-span-1 items-center space-x-4">
                      <div>{leverage.leverageId}</div>
                    </div>
                    <div className="col-span-1 items-center space-x-4">
                      <div>{leverage.Matches?.length}</div>
                    </div>
                    <div className="col-span-2 items-center space-x-4 uppercase">
                      <div>{leverage.goal}</div>
                    </div>
                    <div className="col-span-3 hidden items-center space-x-4 uppercase sm:block">
                      <div>{leverage.review_leverage}</div>
                    </div>
                    <div className="col-span-1 items-center space-x-4">
                      <span
                        className={`col-span-1 rounded px-2 py-1 text-xs font-bold uppercase text-white ${
                          leverage.result === 'red'
                            ? 'bg-red-600'
                            : leverage.result === 'green'
                            ? 'bg-green-600'
                            : leverage.result === 'green'
                            ? 'bg-yellow-400'
                            : 'bg-sky-600'
                        }`}
                      >
                        {leverage.result}
                      </span>
                    </div>
                  </div>
                  <Separator />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
