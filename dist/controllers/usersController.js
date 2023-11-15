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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.getAllUsers = exports.profile = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { username, email, password } = req.body
        // recuperamos la info que nos envian desde el body
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        // validaciones email, password
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.json({ mensaje: 'Correo electrónico no válido' });
        }
        // Validacion password
        // const passswordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{4,12}$/;
        // if (!passswordRegex.test(password)) {
        //   return res.json({ mensaje: 'Password no válido' });
        // }
        // trato la informacion
        const encryptedPassword = bcrypt_1.default.hashSync(password, 10);
        // Guardamos la info en la bd
        const newUser = yield User_1.User.create({
            username: username,
            email: email,
            password: encryptedPassword
        }).save();
        // devolvemos una respuesta
        return res.json({
            success: true,
            message: "User created succesfully",
            data: newUser
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "user cant be created",
            error: error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //recupero info del body
        const email = req.body.email;
        const password = req.body.password;
        // consulto en bd un usuario por email
        const user = yield User_1.User.findOneBy({
            email: email
        });
        if (!user) {
            return res.status(400).json({
                success: true,
                message: 'User or password incorrect',
            });
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            return res.status(400).json({
                success: true,
                message: 'User or password incorrect',
            });
        }
        //generar token
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.role,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "3h",
        });
        return res.json({
            success: true,
            message: "User logged succesfully",
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "users cant be logged",
            error: error
        });
    }
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOneBy({
            id: req.token.id
        });
        return res.json({
            success: true,
            message: "profile user retrieved",
            data: user
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "user profile cant be retrieved",
            error: error
        });
    }
});
exports.profile = profile;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users = await User.find();
        const pageSize = parseInt(req.query.skip) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        // Recupera los usuarios con paginación
        const users = yield User_1.User.find({
            skip: skip,
            take: pageSize,
        });
        return res.json({
            success: true,
            message: "users retrieved",
            data: users
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "users cant be retrieved",
            error: error
        });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOneBy({
            id: parseInt(req.params.id)
        });
        if (!user) {
            return res.status(404).json({
                success: true,
                message: "user doesnt exists"
            });
        }
        yield user.remove();
        return res.status(200).json({
            success: true,
            message: "user removed"
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "User cant by deleted",
            error: error.message
        });
    }
});
exports.deleteUserById = deleteUserById;
