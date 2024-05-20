/*
  Warnings:

  - Added the required column `trialPeriodDays` to the `Prices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Prices` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "unitAmount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "intervalCount" INTEGER NOT NULL,
    "trialPeriodDays" INTEGER NOT NULL,
    CONSTRAINT "Prices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prices" ("active", "currency", "description", "id", "interval", "intervalCount", "productId", "unitAmount") SELECT "active", "currency", "description", "id", "interval", "intervalCount", "productId", "unitAmount" FROM "Prices";
DROP TABLE "Prices";
ALTER TABLE "new_Prices" RENAME TO "Prices";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
