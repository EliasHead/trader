import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Matches } from '@prisma/client'
const prisma = new PrismaClient()

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body: Matches = await request.json()
  const matches = await prisma.matches.update({
    where: {
      match_id: Number(params.id),
    },
    data: {
      home_team_id: Number(body.home_team_id),
      home_goals: Number(body.home_goals),
      visitor_team_id: Number(body.visitor_team_id),
      visitor_goals: Number(body.visitor_goals),
      competition_id: Number(body.competition_id),
      round: Number(body.round),
      result_id: Number(body.result_id),
      ticketId: Number(body.ticketId),
    },
  })
  return NextResponse.json(matches, { status: 200 })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const matches = await prisma.matches.delete({
    where: {
      match_id: Number(params.id),
    },
  })
  return NextResponse.json(matches, { status: 200 })
}
