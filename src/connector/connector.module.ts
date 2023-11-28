import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { APIConnectorFactory, COFFEE_API_CONNECTOR } from './connector-factory';

@Module({
  providers: [
    {
      provide: COFFEE_API_CONNECTOR,
      useFactory: () => APIConnectorFactory.createCoffeeAPIConnectors(),
      inject: [ConfigService],
    },
  ],
  exports: [COFFEE_API_CONNECTOR],
})
export class ConnectorModule {}
