-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_matches" (
    "match_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "match_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "home_goals" INTEGER NOT NULL DEFAULT 0,
    "visitor_goals" INTEGER NOT NULL DEFAULT 0,
    "odd" REAL,
    "strategy" TEXT,
    "result" TEXT DEFAULT '_progress',
    "review" TEXT,
    "stake" REAL,
    "round" INTEGER NOT NULL DEFAULT 0,
    "leverageId" INTEGER,
    "competition_id" INTEGER,
    "home_team_id" INTEGER NOT NULL,
    "visitor_team_id" INTEGER NOT NULL,
    CONSTRAINT "matches_leverageId_fkey" FOREIGN KEY ("leverageId") REFERENCES "Leverage" ("leverageId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "competitions" ("competition_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_visitor_team_id_fkey" FOREIGN KEY ("visitor_team_id") REFERENCES "teams" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_matches" ("competition_id", "home_goals", "home_team_id", "leverageId", "match_date", "match_id", "odd", "result", "review", "round", "stake", "strategy", "visitor_goals", "visitor_team_id") SELECT "competition_id", "home_goals", "home_team_id", "leverageId", "match_date", "match_id", "odd", "result", "review", "round", "stake", "strategy", "visitor_goals", "visitor_team_id" FROM "matches";
DROP TABLE "matches";
ALTER TABLE "new_matches" RENAME TO "matches";
CREATE UNIQUE INDEX "matches_round_home_team_id_visitor_team_id_key" ON "matches"("round", "home_team_id", "visitor_team_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
