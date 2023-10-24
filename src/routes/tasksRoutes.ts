import { Router } from "express";
import { createTask, getAllTasksByUserId } from "../controllers/tasksController";
import { auth } from "../middlewares/auth";

const router = Router()

router.post('/', auth, createTask)
router.get('/', auth, getAllTasksByUserId)

export { router }
