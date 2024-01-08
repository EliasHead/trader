import { PowerRankingType } from "@/app/fairlines/types"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Competition, Teams } from "@prisma/client"
import { AddPowerRanking } from "./add-power-ranking"

type PowerRankingsType = {
  powerRankings: PowerRankingType[]
  teams: Teams[]
  competitions: Competition[]
}

export const HeroSection = ({powerRankings, teams, competitions}: PowerRankingsType) => {
  return (
    <section className="w-full mt-40 lg:h-[755px] flex flex-col justify-center pb-10 sm:pb-32 py-32 lg:pb-[110px]">
      <div className="container flex items-start justify-between lg:justify-center flex-col-reverse lg:flex-row">
        <div className="w-full lg:max-w-[530px]">
          <AddPowerRanking teams={teams} competitions={competitions} />
          <DataTable columns={columns} data={powerRankings}/>
        </div>
      </div>
    </section>
  )
}