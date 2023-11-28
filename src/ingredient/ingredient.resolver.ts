import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IngredientService } from './ingredient.service';

@Resolver('Ingredient')
export class IngredientResolver {
  constructor(private readonly ingredientService: IngredientService) {}

  @Query('ingredients')
  findAll() {
    return this.ingredientService.findAll();
  }

  @Query('ingredient')
  findOne(@Args('id') id: string) {
    return this.ingredientService.findOne(id);
  }
}
