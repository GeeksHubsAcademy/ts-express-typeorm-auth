"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperAdmin = void 0;
const isSuperAdmin = (req, res, next) => {
    if (req.token.role !== "super_admin") {
        return res.json('NO PUEDES PASAR');
    }
    next();
};
exports.isSuperAdmin = isSuperAdmin;
//$10$e0JfODkd9Yg7.n0B49BhauHbMN.k8Wld7TuQdlzBJ9/1UaBUyQTLm -> !aAzzz
