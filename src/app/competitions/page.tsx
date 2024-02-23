import axios from 'axios'
import getQueryClient from '@/lib/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { ListCompetitions } from './list-competitions'
import AddCompetitions from './addCompetitions'

export const getCompetitions = async () => {
  const res = await axios.get('/api/competitions')
  return res.data
}

const Competitions = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['competitions'],
    queryFn: getCompetitions,
  })

  return (
    <section className="flex w-full flex-col py-32 pb-10 sm:pb-32 lg:pb-[110px]">
      <div className="container flex flex-col justify-between gap-4 lg:justify-center">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AddCompetitions />
          <ListCompetitions />
        </HydrationBoundary>
        {/* <DataTable columns={columns} data={competitions} /> */}
        {/* <SearchCompetition competitions={competitions} /> */}
      </div>
    </section>
  )
}

export default Competitions
