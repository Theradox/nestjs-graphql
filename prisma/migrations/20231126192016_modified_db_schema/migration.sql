/*
  Warnings:

  - You are about to drop the column `coffeeAPiOrigin` on the `Coffee` table. All the data in the column will be lost.
  - You are about to drop the column `coffeeId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coffeeAPIOrigin` to the `Coffee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CoffeeAPIOrigin" AS ENUM ('INTERNAL', 'EXTERNAL');

-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_coffeeId_fkey";

-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "coffeeAPiOrigin",
ADD COLUMN     "coffeeAPIOrigin" "CoffeeAPIOrigin" NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "coffeeId";

-- DropTable
DROP TABLE "Ingredients";

-- DropEnum
DROP TYPE "CoffeAPIOrigin";

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderCoffee" (
    "orderId" TEXT NOT NULL,
    "coffeeId" TEXT NOT NULL,

    CONSTRAINT "OrderCoffee_pkey" PRIMARY KEY ("orderId","coffeeId")
);

-- CreateTable
CREATE TABLE "_IngredientToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToOrder_AB_unique" ON "_IngredientToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToOrder_B_index" ON "_IngredientToOrder"("B");

-- AddForeignKey
ALTER TABLE "OrderCoffee" ADD CONSTRAINT "OrderCoffee_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderCoffee" ADD CONSTRAINT "OrderCoffee_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToOrder" ADD CONSTRAINT "_IngredientToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToOrder" ADD CONSTRAINT "_IngredientToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
