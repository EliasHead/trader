-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tickets" (
    "ticketId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "result" TEXT DEFAULT 'progress',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_tickets" ("createdAt", "result", "ticketId", "updatedAt") SELECT "createdAt", "result", "ticketId", "updatedAt" FROM "tickets";
DROP TABLE "tickets";
ALTER TABLE "new_tickets" RENAME TO "tickets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
