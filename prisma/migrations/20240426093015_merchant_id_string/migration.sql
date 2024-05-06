/*
  Warnings:

  - The primary key for the `Merchant` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Merchant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storeDescription" TEXT,
    "storeName" TEXT,
    "storeUrl" TEXT
);
INSERT INTO "new_Merchant" ("id", "storeDescription", "storeName", "storeUrl") SELECT "id", "storeDescription", "storeName", "storeUrl" FROM "Merchant";
DROP TABLE "Merchant";
ALTER TABLE "new_Merchant" RENAME TO "Merchant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
