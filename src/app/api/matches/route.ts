import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Matches } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
  const body: Matches = await request.json()
  const matches = await prisma.matches.create({
    data: {
      home_team_id: Number(body.home_team_id),
      visitor_team_id: Number(body.visitor_team_id),
      competition_id: Number(body.competition_id),
      round: Number(body.round),
      strategy_id: Number(body.strategy_id),
      odd: Number(body.odd),
      stake: Number(body.stake),
    },
  })
  return NextResponse.json(matches, { status: 201 })
}

export const GET = async () => {
  const matches = await prisma.matches.findMany({
    select: {
      match_id: true,
      match_date: true,
      home_goals: true,
      visitor_goals: true,
      odd: true,
      strategy: true,
      result: true,
      review: true,
      stake: true,
      round: true,
      leverage: {
        select: {
          goal: true,
        },
      },
      leverageId: true,
      competition: {
        select: {
          competition_name: true,
        },
      },
      competition_id: true,
      ticket: {
        select: {
          result_id: true,
        },
      },
      ticketId: true,
      home_team: {
        select: {
          team_name: true,
        },
      },
      home_team_id: true,
      visitor_team: {
        select: {
          team_name: true,
        },
      },
      visitor_team_id: true,
    },
    orderBy: [{ match_id: 'desc' }],
  })

  return NextResponse.json(matches, { status: 200 })
}
