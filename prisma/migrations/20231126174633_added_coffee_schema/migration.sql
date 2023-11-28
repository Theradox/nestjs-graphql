-- CreateEnum
CREATE TYPE "CoffeAPIOrigin" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateTable
CREATE TABLE "Coffee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characteristics" TEXT[],
    "coffeeAPiOrigin" "CoffeAPIOrigin" NOT NULL,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);
