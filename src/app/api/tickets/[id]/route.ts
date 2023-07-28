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
      result: body.result,
      odd: Number(body.odd),
      stake: Number(body.stake),
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
