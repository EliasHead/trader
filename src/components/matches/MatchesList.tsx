import { formatDate } from '@/utils/dateUtils'
// import { match } from 'assert'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getMatches = async () => {
  const res = await prisma.matches.findMany({
    select: {
      match_id: true,
      match_date: true,
      home_goals: true,
      visitor_goals: true,
      odd: true,
      strategy: true,
      result: true,
      home_team: {
        select: {
          team_name: true,
        },
      },
      visitor_team: {
        select: {
          team_name: true,
        },
      },
      competition: {
        select: {
          competition_name: true,
        },
      },
    },
  })
  return res
}

export default async function MatchesList() {
  const matches = await getMatches()

  return (
    <div className="w-[90%]">
      <div className="hidden overflow-auto rounded-lg shadow md:inline-block">
        <table className="min-w-full md:w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                data
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Home
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                -
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Visitante
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                resultado
              </th>
            </tr>
          </thead>
          <tbody>
            {matches?.map((match: any) => {
              return (
                <tr className="border-b" key={match.match_id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {match.match_id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {formatDate(match.match_date)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                    {match.home_team.team_name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                    {match.home_goals}
                    <span> x </span>
                    {match.visitor_goals}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                    {match.visitor_team.team_name}
                  </td>
                  <td
                    style={{
                      backgroundColor: match.result === 'red' ? 'red' : 'green',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                    className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                  >
                    {match.result}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {matches.map((match: any) => {
          return (
            <div
              key={match.match_id}
              className="space-y-3 rounded-lg bg-zinc-200 p-4 font-semibold  shadow-lg"
            >
              <div className="flex items-center space-x-2 text-sm">
                <span>Data:</span>
                <div>{formatDate(match.match_date)}</div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div>{match.home_team.team_name}</div>
                <div>
                  {match.home_goals}
                  <span> x </span>
                  {match.visitor_goals}
                </div>
                <div>{match.visitor_team.team_name}</div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span>Reasultado:</span>
                <div
                  style={{
                    backgroundColor: match.result === 'red' ? 'red' : 'green',
                    padding: '0 8px',
                    borderRadius: '4px',
                    color: 'white',
                  }}
                >
                  {match.result}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
