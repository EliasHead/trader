import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Teams } from '@prisma/client'
const prisma = new PrismaClient()

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body: Teams = await request.json()
  const team = await prisma.teams.update({
    where: {
      team_id: Number(params.id),
    },
    data: {
      team_name: body.team_name,
      team_country: body.team_country,
    },
  })
  return NextResponse.json(team, { status: 200 })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const team = await prisma.teams.delete({
    where: {
      team_id: Number(params.id),
    },
  })
  return NextResponse.json(team, { status: 200 })
}
