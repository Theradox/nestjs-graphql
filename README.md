# Setting up the project

- `npm install`
- `npm run prepare`

## Setting up docker compose db
- `docker compose up -d`


## Prisma methods
#### Generate client
- `npm run prisma:generate`
#### Apply migrations
- `npm run prisma:migrate`
#### Seed data
- `npm run prisma:seed`
#### Studio / DB viewer
- `npm run prisma:studio`

## Graphql Generation Script
For every change in the graphql schemas, use the following script to apply changes
- `ts-node scripts/generate-graphql-types.ts`

## Unit test
- `npx jest`
