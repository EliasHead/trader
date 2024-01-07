import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Tickets } from '@prisma/client'
const prisma = new PrismaClient()

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body: Tickets = await request.json()
  const ticket = await prisma.tickets.update({
    where: {
      ticketId: Number(params.id),
    },
    data: {
      result_id: Number(body.result_id),
      odd: Number(body.odd),
      stake: Number(body.stake),
      resultStake: Number(body.resultStake),
      leverageId: Number(body.leverageId),
    },
  })
  return NextResponse.json(ticket, { status: 200 })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const ticket = await prisma.tickets.delete({
    where: {
      ticketId: Number(params.id),
    },
  })
  return NextResponse.json(ticket, { status: 200 })
}
