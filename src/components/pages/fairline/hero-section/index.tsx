import { PowerRankingType } from '@/app/fairlines/types'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Competition, Teams } from '@prisma/client'
import { AddPowerRanking } from './add-power-ranking'

type PowerRankingsType = {
  powerRankings: PowerRankingType[]
  teams: Teams[]
  competitions: Competition[]
}

export const HeroSection = ({
  powerRankings,
  teams,
  competitions,
}: PowerRankingsType) => {
  return (
    <section className="flex w-full flex-col py-32 pb-10 sm:pb-32 lg:pb-[110px]">
      <div className="container flex flex-col-reverse items-start justify-between lg:flex-row lg:justify-center">
        <div className="w-full lg:max-w-[530px]">
          <AddPowerRanking teams={teams} competitions={competitions} />
          <DataTable columns={columns} data={powerRankings} />
        </div>
      </div>
    </section>
  )
}
