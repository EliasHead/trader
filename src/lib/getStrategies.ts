import { db as prisma } from '@/lib/db'

export default async function getStrategies() {
  const res = await prisma.strategies.findMany()

  return res
}
