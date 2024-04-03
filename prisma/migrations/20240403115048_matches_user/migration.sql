/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `VerificationRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `VerificationRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `userId` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("accessToken", "accessTokenExpires", "createdAt", "id", "providerAccountId", "providerId", "providerType", "refreshToken", "updatedAt", "userId") SELECT "accessToken", "accessTokenExpires", "createdAt", "id", "providerAccountId", "providerId", "providerType", "refreshToken", "updatedAt", "userId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "hashedPassword" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "hashedPassword", "id", "image", "name", "updatedAt") SELECT "createdAt", "email", "emailVerified", "hashedPassword", "id", "image", "name", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "expires" DATETIME NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("accessToken", "createdAt", "expires", "id", "sessionToken", "updatedAt", "userId") SELECT "accessToken", "createdAt", "expires", "id", "sessionToken", "updatedAt", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");
CREATE TABLE "new_VerificationRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_VerificationRequest" ("createdAt", "expires", "id", "identifier", "token", "updatedAt") SELECT "createdAt", "expires", "id", "identifier", "token", "updatedAt" FROM "VerificationRequest";
DROP TABLE "VerificationRequest";
ALTER TABLE "new_VerificationRequest" RENAME TO "VerificationRequest";
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");
CREATE TABLE "new_matches" (
    "match_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "match_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "home_goals" INTEGER NOT NULL DEFAULT 0,
    "visitor_goals" INTEGER NOT NULL DEFAULT 0,
    "odd" REAL,
    "stake" REAL,
    "profit_loss" REAL NOT NULL DEFAULT 0,
    "round" INTEGER NOT NULL DEFAULT 0,
    "leverageId" INTEGER,
    "competition_id" INTEGER,
    "home_team_id" INTEGER NOT NULL,
    "visitor_team_id" INTEGER NOT NULL,
    "ticketId" INTEGER,
    "strategy_id" INTEGER NOT NULL,
    "review_id" INTEGER DEFAULT 1,
    "result_id" INTEGER DEFAULT 1,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "matches_leverageId_fkey" FOREIGN KEY ("leverageId") REFERENCES "Leverage" ("leverageId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "competitions" ("competition_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_visitor_team_id_fkey" FOREIGN KEY ("visitor_team_id") REFERENCES "teams" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets" ("ticketId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "Strategies" ("strategy_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Reviews" ("review_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "Results" ("result_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "matches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_matches" ("competition_id", "home_goals", "home_team_id", "leverageId", "match_date", "match_id", "odd", "profit_loss", "result_id", "review_id", "round", "stake", "strategy_id", "ticketId", "visitor_goals", "visitor_team_id") SELECT "competition_id", "home_goals", "home_team_id", "leverageId", "match_date", "match_id", "odd", "profit_loss", "result_id", "review_id", "round", "stake", "strategy_id", "ticketId", "visitor_goals", "visitor_team_id" FROM "matches";
DROP TABLE "matches";
ALTER TABLE "new_matches" RENAME TO "matches";
CREATE UNIQUE INDEX "matches_round_home_team_id_visitor_team_id_strategy_id_key" ON "matches"("round", "home_team_id", "visitor_team_id", "strategy_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
