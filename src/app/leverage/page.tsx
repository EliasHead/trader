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
import { DataTable } from './data-table'
import { columns } from './laverage-columns'

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
          match_id: true,
        },
      },
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
      <DataTable columns={columns} data={leverages} />
    </div>
  )
}
