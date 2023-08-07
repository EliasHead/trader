/*
  Warnings:

  - You are about to drop the column `description` on the `Leverage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Leverage" (
    "leverageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "goal" TEXT DEFAULT '',
    "result" TEXT DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Leverage" ("createdAt", "leverageId", "result") SELECT "createdAt", "leverageId", "result" FROM "Leverage";
DROP TABLE "Leverage";
ALTER TABLE "new_Leverage" RENAME TO "Leverage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
