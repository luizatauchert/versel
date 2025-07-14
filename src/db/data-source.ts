import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});