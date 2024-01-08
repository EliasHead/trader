import { PowerRankingType } from "@/app/fairlines/types"
import { columns } from "./columns"
import { DataTable } from "./data-table"

type PowerRankingsType = {
  powerRankings: PowerRankingType[]
}

export const HeroSection = ({powerRankings}: PowerRankingsType) => {
  return (
    <section className="w-full lg:h-[755px] flex flex-col justify-end pb-10 sm:pb-32 py-32 lg:pb-[110px]">
      <div className="container flex items-start justify-between flex-col-reverse lg:flex-row">
        <div className="w-full lg:max-w-[530px]">
          <DataTable columns={columns} data={powerRankings}/>
        </div>
      </div>
    </section>
  )
}