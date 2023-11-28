import { PrismaClient } from '@prisma/client';
import { CoffeeSeed } from './seeds/coffees';
import { IngredientSeed } from './seeds/ingredients';

const client = new PrismaClient();

const executeSequentiallyAsync = async (
  seeds: ((client: PrismaClient) => Promise<any>)[],
) => {
  for (const seed of seeds) {
    console.info('Executing seeder: %s', seed.name);
    const seededData = await seed(client);
    console.info('Seeded %d rows using %s', seededData.length, seed.name);
  }
};

(async () => {
  const seeds = [IngredientSeed, CoffeeSeed];
  try {
    await executeSequentiallyAsync(seeds);
    console.info('%d seeders were successfully executed', seeds.length);
  } catch (e) {
    console.error('Something went wrong while seeding the data', e);
  } finally {
    await client.$disconnect();
  }
})();
