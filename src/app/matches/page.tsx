// import { resultsData } from '@/utils/results'
import MatchesList from './MatchesList'
import { CreateMatch } from './create-match'
import getQueryClient from '@/lib/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import axios from 'axios'

// TODO: melhorar chamada api
export const getMatches = async () => {
  const res = await axios.get('/api/matches')
  return res.data
}

export default async function Matches() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['matches'],
    queryFn: getMatches,
  })

  return (
    <section className="flex w-full flex-col py-32 pb-10 sm:pb-32 lg:pb-[110px]">
      <div className="container flex flex-col justify-between gap-4 lg:justify-center">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CreateMatch />
          <MatchesList />
        </HydrationBoundary>
      </div>
    </section>
  )
}
