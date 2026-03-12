# generate migration: 
npx typeorm migration:generate src/migrations/CreateTaskTable -d src/config/database.ts

# run migration: 
npx typeorm migration:run -d src/config/database.ts