import { NextFunction, Request, Response } from "express";

const isSuperAdmin = (req: any, res: Response, next: NextFunction) => {

  if (req.token.role !== "super_admin") {
    return res.json('NO PUEDES PASAR')
  }

  next();
}

export { isSuperAdmin }

//$10$e0JfODkd9Yg7.n0B49BhauHbMN.k8Wld7TuQdlzBJ9/1UaBUyQTLm -> !aAzzz