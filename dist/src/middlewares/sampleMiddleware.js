"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleMiddleware = void 0;
const sampleMiddleware = (req, res, next) => {
    console.log("Middleware de ejemplo");
    next();
};
exports.sampleMiddleware = sampleMiddleware;
