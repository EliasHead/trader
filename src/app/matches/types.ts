export type MatchesType = {
  match_id: number
  match_date: Date
  home_goals: number
  visitor_goals: number
  odd: number | null
  strategy: {
    strategy_id: number
    strategy_name: string
  }
  result: {
    result_id: number
    result_name: string | undefined
  } | null
  review: {
    review_id: number
    review_name?: string | undefined
  } | null
  stake: number | null
  round: number
  leverage: {
    goal: string | null
  } | null
  leverageId: number | null
  competition: { competition_name: string } | null
  competition_id: number | null
  ticket: {
    result_id: number | null
  } | null
  ticketId: number | null
  home_team: { team_name: string }
  home_team_id: number
  visitor_team: { team_name: string }
  visitor_team_id: number
}
