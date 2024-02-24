import AddTeams from './addTeams'
import axios from 'axios'
import ListTeams from './list-teams'
import getQueryClient from '@/lib/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export const getTeams = async () => {
  const res = await axios.get('/api/teams')
  return res.data
}

export default async function Teams() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  })

  return (
    <section className="flex w-full flex-col py-32 pb-10 sm:pb-32 lg:pb-[110px]">
      <div className="container flex flex-col justify-between gap-4 lg:justify-center">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AddTeams />
          <ListTeams />
        </HydrationBoundary>
      </div>
    </section>
  )
}
