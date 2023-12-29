/*
  Warnings:

  - You are about to drop the column `result` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `strategy` on the `matches` table. All the data in the column will be lost.
  - Added the required column `strategy_id` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Strategies" (
    "strategy_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "strategy_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reviews" (
    "review_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "review_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Results" (
    "result_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "result_name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_matches" (
    "match_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "match_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "home_goals" INTEGER NOT NULL DEFAULT 0,
    "visitor_goals" INTEGER NOT NULL DEFAULT 0,
    "odd" REAL,
    "stake" REAL,
    "round" INTEGER NOT NULL DEFAULT 0,
    "leverageId" INTEGER,
    "competition_id" INTEGER,
    "home_team_id" INTEGER NOT NULL,
    "visitor_team_id" INTEGER NOT NULL,
    "ticketId" INTEGER,
    "strategy_id" INTEGER NOT NULL,
    "review_id" INTEGER DEFAULT 1,
    "result_id" INTEGER DEFAULT 1,
    CONSTRAINT "matches_leverageId_fkey" FOREIGN KEY ("leverageId") REFERENCES "Leverage" ("leverageId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "competitions" ("competition_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_visitor_team_id_fkey" FOREIGN KEY ("visitor_team_id") REFERENCES "teams" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets" ("ticketId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "Strategies" ("strategy_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Reviews" ("review_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "Results" ("result_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_matches" ("competition_id", "home_goals", "home_team_id", "leverageId", "match_date", "match_id", "odd", "round", "stake", "ticketId", "visitor_goals", "visitor_team_id") SELECT "competition_id", "home_goals", "home_team_id", "leverageId", "match_date", "match_id", "odd", "round", "stake", "ticketId", "visitor_goals", "visitor_team_id" FROM "matches";
DROP TABLE "matches";
ALTER TABLE "new_matches" RENAME TO "matches";
CREATE UNIQUE INDEX "matches_round_home_team_id_visitor_team_id_strategy_id_key" ON "matches"("round", "home_team_id", "visitor_team_id", "strategy_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Strategies_strategy_name_key" ON "Strategies"("strategy_name");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_review_name_key" ON "Reviews"("review_name");

-- CreateIndex
CREATE UNIQUE INDEX "Results_result_name_key" ON "Results"("result_name");
