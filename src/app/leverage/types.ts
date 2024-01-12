export type LeverageType = {
  Tickets: {
    ticketId: number
  }[]
  Matches: {
    match_id: number
  }[]
  leverageId: number
  goal: string | null
  result: string | null
}
