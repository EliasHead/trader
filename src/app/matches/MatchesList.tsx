import { formatDate } from '@/utils/dateUtils'
import DeleteMatch from './deleteMatches'
import { Competition, Teams } from '@prisma/client'
import UpdateMatch from './updateMtaches'

type Match = {
  match_id: number
  match_date: Date
  home_goals: number
  visitor_goals: number
  odd: number | null
  strategy: string | null
  result: string | null
  review: string | null
  stake: number | null
  round: number
  leverage: {
    description: string | null
  } | null
  leverageId?: number
  competition: {
    competition_name: string
  } | null
  competititon_id?: number
  home_team: {
    team_name: string
  }
  home_team_id: number
  visitor_team: {
    team_name: string
  }
  visitor_team_id: number
}

type roundsType = {
  round_id: number
  round_name: number | string
}

type Results = {
  result_id: number
  label: string
}

type MatchesProps = {
  competitions: Competition[]
  teams: Teams[]
  rounds: roundsType[]
  matches: Match[]
  results: Results[]
}

export default async function MatchesList({
  matches,
  teams,
  competitions,
  rounds,
  results,
}: MatchesProps) {
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
            {matches?.map((match) => {
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
                  <td className="flex justify-center space-x-1 px-6 py-4">
                    <UpdateMatch
                      match={match}
                      competitions={competitions}
                      teams={teams}
                      rounds={rounds}
                      results={results}
                    />
                    <DeleteMatch match={match} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {matches.map((match) => {
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
