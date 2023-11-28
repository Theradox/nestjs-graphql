import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { CoffeeService } from './coffee.service';
import { Coffee, Order } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Resolver('Coffee')
export class CoffeeResolver {
  private logger = new Logger(CoffeeResolver.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly coffeeService: CoffeeService,
  ) {}

  @Query('coffees')
  findAllCoffees(): Promise<Coffee[]> {
    return this.coffeeService.findAllCoffees();
  }

  @Query('coffee')
  getCoffeeById(@Args('id') id: string): Promise<Coffee> {
    return this.coffeeService.findCofee(id);
  }

  @Mutation('orderCoffee')
  async orderCoffee(
    @Args('ingredientIds', { type: () => [String] }) ingredientIds: string[],
    @Args('coffeeIds', { type: () => [String] }) coffeeIds: string[],
  ): Promise<Order> {
    this.logger.log('Started order process');
    try {
      const order = await this.databaseService.order.create({
        data: {
          coffees: {
            connect: coffeeIds.map((coffeeId) => ({ id: coffeeId })),
          },
          ingredients: {
            connect: ingredientIds.map((ingredientId) => ({
              id: ingredientId,
            })),
          },
        },
        include: {
          coffees: true,
          ingredients: true,
        },
      });
      return order;
    } catch (error) {
      this.logger.error(`Could not process order. Error: ${error.message}`);
      throw error;
    }
  }
}
