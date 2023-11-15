"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = require("./db");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4000;
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app_1.default.listen(PORT, () => {
        console.log(`Server running ${PORT}`);
    });
})
    .catch(error => {
    console.log(error);
});
