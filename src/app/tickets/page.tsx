import { prisma } from '@/utils/prisma'
import { ListTickets } from './listTickets'

const getTickets = async () => {
  const res = prisma.tickets.findMany()

  return res
}
const Tickets = async () => {
  const tickets = await getTickets()

  return (
    <main className="container mt-16 flex h-screen flex-col items-center justify-start gap-4">
      <h1>Tickets</h1>
      <ListTickets tickets={tickets} />
    </main>
  )
}

export default Tickets
