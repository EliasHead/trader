import { db as prisma } from '@/lib/db'
import { z } from 'zod'

type ProjectProps = {
  params: {
    slug: string
  }
}

const FormSchema = z.object({
  result: z.string({
    required_error: "Please select a home team.",
  }),
  odd: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  stake: z.number({
    required_error: "Please select a away team.",
  }),
  leverageId: z.number({
    required_error: "Please select a competition.",
  })
})

const getTicket = (id: number) => { 
  const res = prisma.tickets.findUnique({
    where: {
      ticketId: id
    },
    include: {
      Matches: {
        select: {
          match_id: true,
        },
      }
    }
  })

  return res
}

const Ticket =  async ({ params: { slug } }: ProjectProps) => {
  const id = parseInt(slug)
  const ticket = await getTicket(id)

	return (
    <div className="mt-20 container">
      
    </div>
  )
}

export default Ticket