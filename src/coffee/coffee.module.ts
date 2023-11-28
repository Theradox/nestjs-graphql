import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeService } from './coffee.service';
import { CoffeeControler } from './coffee.controller';
import { ConnectorModule } from 'src/connector/connector.module';
import { CoffeeResolver } from './coffee.resolver';

@Module({
  imports: [DatabaseModule, ConnectorModule],
  exports: [CoffeeService],
  providers: [CoffeeService, CoffeeResolver],
  controllers: [CoffeeControler],
})
export class CoffeeModule {}
