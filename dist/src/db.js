"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const _1698050881658_create_users_table_1 = require("./migration/1698050881658-create-users-table");
const User_1 = require("./models/User");
const _1698146272912_create_tasks_table_1 = require("./migration/1698146272912-create-tasks-table");
const Task_1 = require("./models/Task");
const _1698228568742_create_table_task_user_1 = require("./migration/1698228568742-create-table-task-user");
exports.AppDataSource = new typeorm_1.DataSource({
    // type: process.env.DB_TYPE as "mysql" | "mariadb",
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // entities: [`${__dirname}/models/**/*{.js,.ts}`],
    entities: [User_1.User, Task_1.Task],
    // migration: [`${__dirname}/migration/**/*{.js,.ts}`],
    migrations: [
        _1698050881658_create_users_table_1.CreateUsersTable1698050881658,
        _1698146272912_create_tasks_table_1.CreateTasksTable1698146272912,
        _1698228568742_create_table_task_user_1.CreateTableTaskUser1698228568742
    ],
    synchronize: false,
    logging: false,
});
// export { AppDataSource }
