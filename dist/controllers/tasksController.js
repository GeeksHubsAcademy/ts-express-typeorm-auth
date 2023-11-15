"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksAssignedByUser = exports.updateTaskById = exports.getTaskByUserId = exports.getAllTasksByUserId = exports.createTask = void 0;
const Task_1 = require("../models/Task");
const User_1 = require("../models/User");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //recuperar la info
        const title = req.body.title;
        const description = req.body.description;
        //validar si hace falta la info
        //tratar si hace falta la info
        const task = yield Task_1.Task.create({
            title: title,
            description: description,
            user_id: req.token.id
        }).save();
        return res.json({
            success: true,
            message: "users retrieved",
            data: task
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "task cant be created",
            error: error
        });
    }
});
exports.createTask = createTask;
const getAllTasksByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.Task.findBy({
            user_id: req.token.id
        });
        return res.json({
            success: true,
            message: "tasks by user retrieved",
            data: tasks
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "tasks cant by user retrieved",
            error: error
        });
    }
});
exports.getAllTasksByUserId = getAllTasksByUserId;
const getTaskByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield Task_1.Task.findOne({
            select: {
                id: true,
                title: true,
                status: true,
                created_at: true,
                user: {
                    id: true,
                    username: true,
                    email: true
                }
            },
            where: {
                id: parseInt(taskId),
                user_id: req.token.id
            },
            relations: {
                user: true,
            },
        });
        // const userTask = await User.findOne(
        //   {
        //     select: ['id', 'email', "username"],
        //     where: {
        //       id: task?.user_id
        //     }
        //   }
        // )
        if (!task) {
            return res.status(404).json({
                success: true,
                message: "task by user doesnt found",
            });
        }
        return res.json({
            success: true,
            message: "task by user retrieved",
            data: task,
            // user: userTask
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "task cant by user retrieved",
            error: error
        });
    }
});
exports.getTaskByUserId = getTaskByUserId;
const updateTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // recuperamos la info
        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
        // validar la info
        // comprobarmos si la task nos pertenece 
        const taskId = req.params.id;
        const task = yield Task_1.Task.findOneBy({
            id: parseInt(taskId),
            user_id: req.token.id
        });
        if (!task) {
            return res.status(404).json({
                success: true,
                message: "task by user doesnt found and cant updated",
            });
        }
        const updateTask = yield Task_1.Task.update({
            id: parseInt(taskId)
        }, {
            title: title,
            description: description,
            status: status
        });
        return res.json({
            success: true,
            message: "task updated",
            data: updateTask
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "task cant by updated",
            error: error
        });
    }
});
exports.updateTaskById = updateTaskById;
const getTasksAssignedByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({
            where: {
                id: req.token.id
            },
            relations: {
                userTasks: true
            }
        });
        return res.json({
            success: true,
            message: "Tasks by user retrieved",
            data: user
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "tasks cant by retrieved",
            error: error
        });
    }
});
exports.getTasksAssignedByUser = getTasksAssignedByUser;
