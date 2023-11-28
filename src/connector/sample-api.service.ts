import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Coffee, CoffeeAPIOrigin } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { CoffeeGatewayConnector } from './connector.interface';
import { SampleApiCoffeeType } from './connector-factory';

@Injectable()
export class SampleAPIService implements CoffeeGatewayConnector {
  private logger = new Logger(SampleAPIService.name);

  private sampleApiGatewaySecret: string;
  private sampleApiGatewayUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.sampleApiGatewaySecret = this.configService.get<string>(
      'SAMPLE_API_GATEWAY_SECRET',
    );
    this.sampleApiGatewayUrl = this.configService.get<string>(
      'SAMPLE_API_GATEWAY_URL',
    );
  }
  async processGatewayConnection(): Promise<SampleApiCoffeeType[]> {
    this.logger.log('Started api gateway connection');
    try {
      const { data }: AxiosResponse<SampleApiCoffeeType[]> = await axios.get(
        this.sampleApiGatewayUrl,
      );

      this.logger.log('Successfully fetched api gateway data');
      return data;
    } catch (error) {
      this.logger.error(`Failed to connect to api. Error: ${error.message}`);
      throw error;
    }
  }
  async parseCoffeeGatewayData(): Promise<Coffee[]> {
    this.logger.log('Started parsing gateway data');
    try {
      const processedData: SampleApiCoffeeType[] =
        await this.processGatewayConnection();

      const parsedData: Coffee[] = processedData.map(
        (apiCoffee: SampleApiCoffeeType) => ({
          id: apiCoffee.id.toString(),
          name: apiCoffee.title,
          description: apiCoffee.description,
          characteristics: apiCoffee.ingredients,
          coffeeAPIOrigin: CoffeeAPIOrigin.EXTERNAL,
          thirdPartyCoffeeOrigin: this.sampleApiGatewaySecret,
        }),
      );

      this.logger.log('Successfully parsed gateway data');
      return parsedData;
    } catch (error) {
      this.logger.error(`Could not parse data. Error: ${error.message}`);
      throw error;
    }
  }
}
