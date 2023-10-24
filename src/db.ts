import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateUsersTable1698050881658 } from "./migration/1698050881658-create-users-table"
import { User } from "./models/User"
import { CreateTasksTable1698146272912 } from "./migration/1698146272912-create-tasks-table"
import { Task } from "./models/Task"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "fsd-typeorm",
  entities: [User, Task],
  migrations: [
    CreateUsersTable1698050881658,
    CreateTasksTable1698146272912
  ],
  synchronize: false,
  logging: false,
})

// export { AppDataSource }
