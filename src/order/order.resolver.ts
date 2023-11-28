import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderInput } from '../../src/types/graphql';
import { OrderService } from './order.service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation('orderCoffee')
  create(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Query('order')
  findAll() {
    return this.orderService.findAll();
  }

  @Query('order')
  findOne(@Args('id') id: string) {
    return this.orderService.findOne(id);
  }
}
