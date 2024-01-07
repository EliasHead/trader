import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Tickets } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
  const body: Tickets = await request.json()
  const team = await prisma.tickets.create({
    data: {
      result_id: Number(body.result_id),
      odd: Number(body.odd),
      stake: Number(body.stake),
    },
  })
  return NextResponse.json(team, { status: 201 })
}
