import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Teams } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
  const body: Teams = await request.json()
  const team = await prisma.teams.create({
    data: {
      team_name: body.team_name,
      team_country: body.team_country,
    },
  })
  return NextResponse.json(team, { status: 201 })
}

export const GET = async () => {
  const teams: Teams[] = await prisma.teams.findMany()

  return NextResponse.json(teams, { status: 200 })
}
