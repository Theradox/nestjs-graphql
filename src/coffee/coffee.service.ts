import { Inject, Injectable, Logger } from '@nestjs/common';
import { Coffee } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { COFFEE_API_CONNECTOR } from 'src/connector/connector-factory';
import { CoffeeGatewayConnector } from 'src/connector/connector.interface';

@Injectable()
export class CoffeeService {
  private logger = new Logger(CoffeeService.name);

  constructor(
    @Inject(COFFEE_API_CONNECTOR)
    private gatewayConnectors: CoffeeGatewayConnector[],
    private readonly databaseService: DatabaseService,
  ) {}

  public createCoffee(data: Coffee): Promise<Coffee> {
    return this.databaseService.coffee.create({
      data,
    });
  }

  public findCofee(id: string): Promise<Coffee | undefined> {
    return this.databaseService.coffee.findUnique({
      where: {
        id,
      },
    });
  }

  public async findAllCoffees(): Promise<Coffee[]> {
    this.logger.log(`Started fetching data`);
    const connection = await this.fetchCoffeeDataFromConnectors();
    const coffees: Coffee[] = await this.databaseService.coffee.findMany();
    this.logger.log(`Successfully fetched all coffee data`);
    return coffees.concat(connection);
  }

  private async fetchCoffeeDataFromConnectors(): Promise<Coffee[]> {
    this.logger.log(`Started fetching data from all connectors`);
    try {
      const collectedData = await Promise.all(
        this.gatewayConnectors.map(async (connector) => {
          return await connector.parseCoffeeGatewayData();
        }),
      );
      this.logger.log(`Successfully fetched data from all connectors`);
      return collectedData.flat();
    } catch (error) {
      this.logger.error(
        `Error fetching data from connectors: ${error.message}`,
      );
      throw error;
    }
  }
}
