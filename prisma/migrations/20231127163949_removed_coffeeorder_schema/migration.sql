/*
  Warnings:

  - You are about to drop the `OrderCoffee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderCoffee" DROP CONSTRAINT "OrderCoffee_coffeeId_fkey";

-- DropForeignKey
ALTER TABLE "OrderCoffee" DROP CONSTRAINT "OrderCoffee_orderId_fkey";

-- DropTable
DROP TABLE "OrderCoffee";

-- CreateTable
CREATE TABLE "_CoffeeToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeToOrder_AB_unique" ON "_CoffeeToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeToOrder_B_index" ON "_CoffeeToOrder"("B");

-- AddForeignKey
ALTER TABLE "_CoffeeToOrder" ADD CONSTRAINT "_CoffeeToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeToOrder" ADD CONSTRAINT "_CoffeeToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
