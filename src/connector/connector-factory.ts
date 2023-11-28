import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SampleAPIService } from './sample-api.service';
import { CoffeeGatewayConnector } from './connector.interface';

export type SampleApiCoffeeType = {
  id: number;
  title: string;
  description: string;
  ingredients: [];
  image: string;
};

export const COFFEE_API_CONNECTOR = 'COFFEE_API_CONNECTOR';

@Injectable()
export class APIConnectorFactory {
  private static connectors: CoffeeGatewayConnector[] = [
    new SampleAPIService(new ConfigService()),
  ];

  public static createCoffeeAPIConnectors(): CoffeeGatewayConnector[] {
    return APIConnectorFactory.connectors;
  }
}
