import { CoffeeAPIOrigin, Coffee, PrismaClient } from '@prisma/client';

const coffees: Coffee[] = [
  {
    id: '1',
    name: 'Espresso',
    description:
      'A concentrated coffee brewed by forcing a small amount of nearly boiling water through finely-ground coffee beans. It has a strong and robust flavor.',
    characteristics: ['Strong', 'Concentrated', 'Bold'],
    coffeeAPIOrigin: CoffeeAPIOrigin.INTERNAL,
    thirdPartyCoffeeOrigin: '',
  },
  {
    id: '2',
    name: 'Latte',
    description:
      'An espresso-based drink with steamed milk and a small amount of frothed milk on top. It has a creamy texture and a milder coffee flavor.',
    characteristics: ['Creamy', 'Mild', 'Smooth'],
    coffeeAPIOrigin: CoffeeAPIOrigin.INTERNAL,
    thirdPartyCoffeeOrigin: '',
  },
  {
    id: '3',
    name: 'Cappuccino',
    description:
      'Similar to a latte but with a higher proportion of frothed milk. It has a strong coffee flavor with a velvety and foamy texture.',
    characteristics: ['Foamy', 'Strong', 'Rich'],
    coffeeAPIOrigin: CoffeeAPIOrigin.INTERNAL,
    thirdPartyCoffeeOrigin: '',
  },
  {
    id: '4',
    name: 'Cold Brew',
    description:
      'Coffee brewed with cold water over an extended period, resulting in a smooth and less acidic flavor. It is typically served over ice.',
    characteristics: ['Smooth', 'Cold', 'Refreshing'],
    coffeeAPIOrigin: CoffeeAPIOrigin.INTERNAL,
    thirdPartyCoffeeOrigin: '',
  },
  {
    id: '5',
    name: 'Americano',
    description:
      'Made by diluting a shot of espresso with hot water, giving it a similar strength to drip coffee. It has a milder flavor than straight espresso.',
    characteristics: ['Mild', 'Balanced', 'Diluted'],
    coffeeAPIOrigin: CoffeeAPIOrigin.INTERNAL,
    thirdPartyCoffeeOrigin: '',
  },
  {
    id: '6',
    name: 'Macchiato',
    description:
      'An espresso with a small amount of frothy milk on top. It strikes a balance between the intensity of espresso and the creaminess of milk.',
    characteristics: ['Intense', 'Balanced', 'Small'],
    coffeeAPIOrigin: CoffeeAPIOrigin.INTERNAL,
    thirdPartyCoffeeOrigin: '',
  },
];

export const CoffeeSeed = async (client: PrismaClient): Promise<Coffee[]> => {
  await client.coffee.createMany({
    data: coffees,
    skipDuplicates: true,
  });

  return client.coffee.findMany();
};
