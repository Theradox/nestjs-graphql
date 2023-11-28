import { Coffee } from '@prisma/client';

export interface CoffeeGatewayConnector {
  processGatewayConnection(): Promise<any>;
  parseCoffeeGatewayData(): Promise<Coffee[]>;
}
