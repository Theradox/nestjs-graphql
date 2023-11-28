/*
  Warnings:

  - Changed the type of `coffeeAPIOrigin` on the `Coffee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ThirdPartyCoffeeAPIOrigin" AS ENUM ('INTERNAL', 'EXTERNAL');

-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "coffeeAPIOrigin",
ADD COLUMN     "coffeeAPIOrigin" "ThirdPartyCoffeeAPIOrigin" NOT NULL;

-- DropEnum
DROP TYPE "CoffeeAPIOrigin";
