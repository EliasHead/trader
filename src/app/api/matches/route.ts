import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Matches } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
  const body: Matches = await request.json()
  const matches = await prisma.matches.create({
    data: {
      home_team_id: body.home_team_id,
      visitor_team_id: body.visitor_team_id,
      competition_id: body.competition_id,
      round: body.round,
    },
  })
  return NextResponse.json(matches, { status: 201 })
}
