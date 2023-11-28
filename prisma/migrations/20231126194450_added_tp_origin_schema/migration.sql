/*
  Warnings:

  - A unique constraint covering the columns `[id,thirdPartyCoffeeOrigin]` on the table `Coffee` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `coffeeAPIOrigin` on the `Coffee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CoffeeAPIOrigin" AS ENUM ('INTERNAL', 'EXTERNAL');

-- AlterTable
ALTER TABLE "Coffee" ADD COLUMN     "thirdPartyCoffeeOrigin" TEXT,
DROP COLUMN "coffeeAPIOrigin",
ADD COLUMN     "coffeeAPIOrigin" "CoffeeAPIOrigin" NOT NULL;

-- DropEnum
DROP TYPE "ThirdPartyCoffeeAPIOrigin";

-- CreateIndex
CREATE UNIQUE INDEX "Coffee_id_thirdPartyCoffeeOrigin_key" ON "Coffee"("id", "thirdPartyCoffeeOrigin");
