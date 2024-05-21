/*
  Warnings:

  - You are about to drop the column `storeDescription` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `storeName` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `storeUrl` on the `Merchant` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Merchant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "name" TEXT,
    "url" TEXT,
    "profileImage" TEXT
);
INSERT INTO "new_Merchant" ("id") SELECT "id" FROM "Merchant";
DROP TABLE "Merchant";
ALTER TABLE "new_Merchant" RENAME TO "Merchant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
