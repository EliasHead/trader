/*
  Warnings:

  - You are about to drop the column `result` on the `tickets` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tickets" (
    "ticketId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "odd" REAL,
    "stake" REAL,
    "resultStake" REAL NOT NULL DEFAULT 0,
    "leverageId" INTEGER DEFAULT 1,
    "result_id" INTEGER DEFAULT 1,
    CONSTRAINT "tickets_leverageId_fkey" FOREIGN KEY ("leverageId") REFERENCES "Leverage" ("leverageId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tickets_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "Results" ("result_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tickets" ("createdAt", "leverageId", "odd", "resultStake", "stake", "ticketId", "updatedAt") SELECT "createdAt", "leverageId", "odd", "resultStake", "stake", "ticketId", "updatedAt" FROM "tickets";
DROP TABLE "tickets";
ALTER TABLE "new_tickets" RENAME TO "tickets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
