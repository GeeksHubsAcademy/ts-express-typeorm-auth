"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const usersRoutes_1 = require("./routes/usersRoutes");
const tasksRoutes_1 = require("./routes/tasksRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 4000;
// routes
app.get('/api/healthy', (req, res) => {
    return res.send('Healthy');
});
app.use('/user', usersRoutes_1.router);
app.use('/tasks', tasksRoutes_1.router);
// AppDataSource.initialize()
//   .then(() => {
//     console.log('Database connected');
exports.default = app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
});
// })
// .catch(error => {
//   console.log(error)
// })
