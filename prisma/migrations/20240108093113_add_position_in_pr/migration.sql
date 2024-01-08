/*
  Warnings:

  - Added the required column `position` to the `PowerRankings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PowerRankings" (
    "powerRankingId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "PowerRankings_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PowerRankings" ("powerRankingId", "teamId") SELECT "powerRankingId", "teamId" FROM "PowerRankings";
DROP TABLE "PowerRankings";
ALTER TABLE "new_PowerRankings" RENAME TO "PowerRankings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
