-- CreateTable
CREATE TABLE "Customers" (
    "merchantId" TEXT NOT NULL PRIMARY KEY,
    "stripeId" TEXT NOT NULL,
    CONSTRAINT "Customers_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Prices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "unitAmount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "intervalCount" INTEGER NOT NULL,
    CONSTRAINT "Prices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodStart" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodEnd" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "cancelAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "canceledAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Subscriptions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers" ("merchantId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscriptions_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Prices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
