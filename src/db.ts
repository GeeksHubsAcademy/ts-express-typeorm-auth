import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateUsersTable1698050881658 } from "./migration/1698050881658-create-users-table"
import { User } from "./models/User"
import { CreateTasksTable1698146272912 } from "./migration/1698146272912-create-tasks-table"
import { Task } from "./models/Task"
import { CreateTableTaskUser1698228568742 } from "./migration/1698228568742-create-table-task-user"

type database = "mysql" | "mariadb"

export const AppDataSource = new DataSource({
  // type: process.env.DB_TYPE as "mysql" | "mariadb",
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // entities: [`${__dirname}/models/**/*{.js,.ts}`],
  entities: [User, Task],
  // migration: [`${__dirname}/migration/**/*{.js,.ts}`],
  migrations: [
    CreateUsersTable1698050881658,
    CreateTasksTable1698146272912,
    CreateTableTaskUser1698228568742
  ],
  synchronize: false,
  logging: false,
})

// export { AppDataSource }
