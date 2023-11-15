"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.json({
                message: 'AUTH_REQUIRED'
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.json({
                message: 'AUTH_REQUIRED'
            });
        }
        const tokenDecoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.token = tokenDecoded;
        next();
    }
    catch (error) {
        return res.json({
            error: "Not auth"
        });
    }
};
exports.auth = auth;
