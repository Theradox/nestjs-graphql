import { Injectable, Logger } from '@nestjs/common';
import { Ingredient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class IngredientService {
  private logger = new Logger(IngredientService.name);
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Promise<Ingredient[]> {
    return this.databaseService.ingredient.findMany();
  }

  findOne(id: string): Promise<Ingredient> {
    return this.databaseService.ingredient.findUnique({ where: { id } });
  }
}
