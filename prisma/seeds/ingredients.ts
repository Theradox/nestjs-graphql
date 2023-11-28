import { Ingredient, PrismaClient } from '@prisma/client';

const ingredients: Ingredient[] = [
  {
    id: '1',
    name: 'Sweetener',
    description:
      'Add sweetness to your coffee with sugar, honey, or other sweeteners. Adjust the amount based on your taste preferences.',
  },
  {
    id: '2',
    name: 'Flavorings',
    description:
      'Experiment with flavorings like vanilla, caramel, or hazelnut syrup to add a unique twist to your coffee and tailor it to your liking.',
  },
  {
    id: '3',
    name: 'Ice (for Iced Coffee)',
    description:
      'If you prefer a chilled coffee experience, adding ice is essential. Cold brew or iced coffee can be refreshing, especially on warmer days.',
  },
  {
    id: '4',
    name: 'Whipped Cream',
    description:
      'For a luxurious touch, top off your coffee with whipped cream. It adds a creamy and delightful element to your favorite brew.',
  },
  {
    id: '5',
    name: 'Cinnamon',
    description:
      'Sprinkle a dash of cinnamon to add warmth and a hint of spice to your coffee. It complements the coffee flavor and provides a delightful aroma.',
  },
  {
    id: '6',
    name: 'Chocolate Syrup',
    description:
      'Enhance your coffee with a drizzle of chocolate syrup for a rich and indulgent treat. Its perfect for those with a sweet tooth.',
  },
  {
    id: '7',
    name: 'Cardamom',
    description:
      'For a unique and exotic flavor, consider adding a pinch of ground cardamom to your coffee. It brings a fragrant and slightly citrusy note.',
  },
];

export const IngredientSeed = async (
  client: PrismaClient,
): Promise<Ingredient[]> => {
  await client.ingredient.createMany({
    data: ingredients,
  });
  return client.ingredient.findMany();
};
