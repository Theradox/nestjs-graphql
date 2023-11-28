import { Injectable, Logger } from '@nestjs/common';
import { Order } from '@prisma/client';
import { DatabaseService } from '../../src/database/database.service';
import { CreateOrderInput } from 'src/types/graphql';

@Injectable()
export class OrderService {
  private logger = new Logger(OrderService.name);
  constructor(private readonly databaseService: DatabaseService) {}

  public async createOrder(createOrderInput: CreateOrderInput) {
    const { coffeeIds, ingredientIds } = createOrderInput;

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

  public findAll(): Promise<Order[]> {
    return this.databaseService.order.findMany({
      include: { coffees: true, ingredients: true },
    });
  }

  public findOne(id: string): Promise<Order> {
    return this.databaseService.order.findUnique({
      where: { id },
      include: { coffees: true, ingredients: true },
    });
  }
}
