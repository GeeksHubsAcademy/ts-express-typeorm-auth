import { Router } from "express";
import { createTask } from "../controllers/tasksController";
import { auth } from "../middlewares/auth";

const router = Router()

router.post('/', auth, createTask)

export { router }
