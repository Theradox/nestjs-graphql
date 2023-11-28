import { Controller, Get, Logger, Post } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { COFFEE_URL_PATH } from './coffee.constant';
import { Coffee } from '@prisma/client';

@Controller(COFFEE_URL_PATH)
export class CoffeeControler {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  public getCoffees() {
    return this.coffeeService.findAllCoffees();
  }

  @Post()
  public createCoffee(coffee: Coffee): Promise<Coffee> {
    return this.coffeeService.createCoffee(coffee);
  }
}
