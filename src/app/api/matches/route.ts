import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Matches } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
  const body: Matches = await request.json()
  console.log(body)
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
