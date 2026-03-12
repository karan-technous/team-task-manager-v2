import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "team-task-management",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
});
