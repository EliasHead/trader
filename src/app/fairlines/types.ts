export type PowerRankingType = {
  powerRankingId: number
  position: number
  teamId: number
  competitionId: number | null
  competition: {
    competition_id: number
    competition_name: string
    season_name: string
    createdAt: Date
  } | null
  team: {
    team_id: number
    team_name: string
    team_country: string
    team_initials: string | null
    createdAt: Date
  }
}
