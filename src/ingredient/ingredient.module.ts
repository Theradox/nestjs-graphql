import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientResolver } from './ingredient.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [IngredientResolver, IngredientService],
})
export class IngredientModule {}
