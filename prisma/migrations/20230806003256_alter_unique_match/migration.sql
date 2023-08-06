/*
  Warnings:

  - A unique constraint covering the columns `[round,home_team_id,visitor_team_id,strategy]` on the table `matches` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "matches_round_home_team_id_visitor_team_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "matches_round_home_team_id_visitor_team_id_strategy_key" ON "matches"("round", "home_team_id", "visitor_team_id", "strategy");
