/*
  Warnings:

  - You are about to drop the column `url` on the `Merchant` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Merchant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storeDescription" TEXT,
    "storeName" TEXT,
    "storeUrl" TEXT
);
INSERT INTO "new_Merchant" ("id", "storeDescription", "storeName") SELECT "id", "storeDescription", "storeName" FROM "Merchant";
DROP TABLE "Merchant";
ALTER TABLE "new_Merchant" RENAME TO "Merchant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
