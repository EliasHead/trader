-- CreateTable
CREATE TABLE "PowerRankings" (
    "powerRankingId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "PowerRankings_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_competitions" (
    "competition_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "competition_name" TEXT NOT NULL,
    "season_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "powerRankingId" INTEGER,
    CONSTRAINT "competitions_powerRankingId_fkey" FOREIGN KEY ("powerRankingId") REFERENCES "PowerRankings" ("powerRankingId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_competitions" ("competition_id", "competition_name", "createdAt", "season_name") SELECT "competition_id", "competition_name", "createdAt", "season_name" FROM "competitions";
DROP TABLE "competitions";
ALTER TABLE "new_competitions" RENAME TO "competitions";
CREATE UNIQUE INDEX "competitions_competition_name_key" ON "competitions"("competition_name");
CREATE UNIQUE INDEX "competitions_powerRankingId_key" ON "competitions"("powerRankingId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
