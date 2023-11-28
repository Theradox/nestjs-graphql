import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const updateDefinitions = new GraphQLDefinitionsFactory();

updateDefinitions.generate({
  typePaths: ['./**/*.graphql'],
  path: join(process.cwd(), 'src/types/graphql.ts'),
  outputAs: 'class',
});
