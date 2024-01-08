/*
  Warnings:

  - You are about to drop the column `powerRankingId` on the `competitions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_competitions" (
    "competition_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "competition_name" TEXT NOT NULL,
    "season_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_competitions" ("competition_id", "competition_name", "createdAt", "season_name") SELECT "competition_id", "competition_name", "createdAt", "season_name" FROM "competitions";
DROP TABLE "competitions";
ALTER TABLE "new_competitions" RENAME TO "competitions";
CREATE UNIQUE INDEX "competitions_competition_name_key" ON "competitions"("competition_name");
CREATE TABLE "new_PowerRankings" (
    "powerRankingId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "competitionId" INTEGER,
    CONSTRAINT "PowerRankings_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PowerRankings_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "competitions" ("competition_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PowerRankings" ("position", "powerRankingId", "teamId") SELECT "position", "powerRankingId", "teamId" FROM "PowerRankings";
DROP TABLE "PowerRankings";
ALTER TABLE "new_PowerRankings" RENAME TO "PowerRankings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
