import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeAPIOrigin } from '@prisma/client';
import { DatabaseService } from '../../src/database/database.service';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, DatabaseService],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      const createOrderInput = {
        coffeeIds: ['6'],
        ingredientIds: ['7', '6'],
      };

      const orderData = {
        id: '1`',
        coffees: [
          {
            id: '6',
            name: 'Macchiato',
            description:
              'An espresso with a small amount of frothy milk on top. It strikes a balance between the intensity of espresso and the creaminess of milk.',
            characteristics: ['Intense', 'Balanced', 'Small'],
            coffeeAPIOrigin: CoffeeAPIOrigin.INTERNAL,
            thirdPartyCoffeeOrigin: '',
          },
        ],
        ingredients: [
          {
            id: '7',
            name: 'Cardamom',
            description:
              'For a unique and exotic flavor, consider adding a pinch of ground cardamom to your coffee. It brings a fragrant and slightly citrusy note.',
          },
          {
            id: '6',
            name: 'Chocolate Syrup',
            description:
              'Enhance your coffee with a drizzle of chocolate syrup for a rich and indulgent treat. Its perfect for those with a sweet tooth.',
          },
        ],
      };

      jest.spyOn(databaseService.order, 'create').mockResolvedValue(orderData);

      const result = await orderService.createOrder(createOrderInput);

      expect(result.coffees.map((coffee) => coffee.id)).toEqual(
        createOrderInput.coffeeIds,
      );

      expect(result.ingredients.map((ingredient) => ingredient.id)).toEqual(
        createOrderInput.ingredientIds,
      );
    });

    it('should not order when specified coffee does not exist', async () => {
      const createOrderInput = {
        coffeeIds: ['2'],
        ingredientIds: ['7', '6'],
      };

      const orderData = {
        id: '1`',
        coffees: [
          {
            id: '6',
            name: 'Macchiato',
            description:
              'An espresso with a small amount of frothy milk on top. It strikes a balance between the intensity of espresso and the creaminess of milk.',
            characteristics: ['Intense', 'Balanced', 'Small'],
            coffeeAPIOrigin: CoffeeAPIOrigin.INTERNAL,
            thirdPartyCoffeeOrigin: '',
          },
        ],
        ingredients: [
          {
            id: '7',
            name: 'Cardamom',
            description:
              'For a unique and exotic flavor, consider adding a pinch of ground cardamom to your coffee. It brings a fragrant and slightly citrusy note.',
          },
          {
            id: '6',
            name: 'Chocolate Syrup',
            description:
              'Enhance your coffee with a drizzle of chocolate syrup for a rich and indulgent treat. Its perfect for those with a sweet tooth.',
          },
        ],
      };

      jest.spyOn(databaseService.order, 'create').mockResolvedValue(orderData);

      const result = await orderService.createOrder(createOrderInput);

      expect(result.coffees.map((coffee) => coffee.id)).not.toEqual(
        createOrderInput.coffeeIds,
      );
    });

    it('should not order when specified ingredient does not exist', async () => {
      const createOrderInput = {
        coffeeIds: ['6'],
        ingredientIds: ['7', '6'],
      };

      const orderData = {
        id: '1`',
        coffees: [
          {
            id: '6',
            name: 'Macchiato',
            description:
              'An espresso with a small amount of frothy milk on top. It strikes a balance between the intensity of espresso and the creaminess of milk.',
            characteristics: ['Intense', 'Balanced', 'Small'],
            coffeeAPIOrigin: CoffeeAPIOrigin.INTERNAL,
            thirdPartyCoffeeOrigin: '',
          },
        ],
        ingredients: [
          {
            id: '4',
            name: 'Whipped Cream',
            description:
              'For a luxurious touch, top off your coffee with whipped cream. It adds a creamy and delightful element to your favorite brew.',
          },
          {
            id: '6',
            name: 'Chocolate Syrup',
            description:
              'Enhance your coffee with a drizzle of chocolate syrup for a rich and indulgent treat. Its perfect for those with a sweet tooth.',
          },
        ],
      };

      jest.spyOn(databaseService.order, 'create').mockResolvedValue(orderData);

      const result = await orderService.createOrder(createOrderInput);

      expect(result.ingredients.map((ingredient) => ingredient.id)).not.toEqual(
        createOrderInput.ingredientIds,
      );
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      // Mock data
      const ordersData = [
        // Mock the expected order data that should be returned from the database
        // You need to adjust this based on your actual data structure
        { id: 'orderId1', coffees: [], ingredients: [] },
        { id: 'orderId2', coffees: [], ingredients: [] },
      ];

      // Mock the databaseService.order.findMany method
      jest
        .spyOn(databaseService.order, 'findMany')
        .mockResolvedValue(ordersData);

      // Call the findAll method
      const result = await orderService.findAll();

      // Assert the result
      expect(result).toEqual(ordersData);

      // Assert that the databaseService.order.findMany method was called with the correct arguments
      expect(databaseService.order.findMany).toHaveBeenCalledWith({
        include: { coffees: true, ingredients: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return one order by id', async () => {
      // Mock data
      const orderId = 'orderId';
      const orderData = {
        // Mock the expected order data that should be returned from the database
        // You need to adjust this based on your actual data structure
        id: orderId,
        coffees: [{ id: 'coffeeId' }],
        ingredients: [{ id: 'ingredientId' }],
      };

      // Mock the databaseService.order.findUnique method
      jest
        .spyOn(databaseService.order, 'findUnique')
        .mockResolvedValue(orderData);

      // Call the findOne method
      const result = await orderService.findOne(orderId);

      // Assert the result
      expect(result).toEqual(orderData);

      // Assert that the databaseService.order.findUnique method was called with the correct arguments
      expect(databaseService.order.findUnique).toHaveBeenCalledWith({
        where: { id: orderId },
        include: { coffees: true, ingredients: true },
      });
    });
  });
});
