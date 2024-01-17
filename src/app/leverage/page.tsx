import { db as prisma } from '@/lib/db'
import { AddLeverage } from './addLeverage'
import { DataTable } from './data-table'
import { columns } from './columns'

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
    <section className="flex w-full flex-col py-32 pb-10 sm:pb-32 lg:pb-[110px]">
      <div className="container flex flex-col justify-between gap-4 lg:justify-center">
        <div className="m-auto">
          <AddLeverage />
        </div>
        <DataTable columns={columns} data={leverages} />
      </div>
    </section>
  )
}
