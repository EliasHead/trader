-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tickets" (
    "ticketId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "result" TEXT DEFAULT 'progress',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "odd" REAL,
    "stake" REAL,
    "resultStake" REAL NOT NULL DEFAULT 0,
    "leverageId" INTEGER,
    CONSTRAINT "tickets_leverageId_fkey" FOREIGN KEY ("leverageId") REFERENCES "Leverage" ("leverageId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tickets" ("createdAt", "odd", "result", "resultStake", "stake", "ticketId", "updatedAt") SELECT "createdAt", "odd", "result", "resultStake", "stake", "ticketId", "updatedAt" FROM "tickets";
DROP TABLE "tickets";
ALTER TABLE "new_tickets" RENAME TO "tickets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
