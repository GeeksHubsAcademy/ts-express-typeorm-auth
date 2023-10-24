import { Router } from "express";
import { createTask, getAllTasksByUserId, getTaskByUserId } from "../controllers/tasksController";
import { auth } from "../middlewares/auth";

const router = Router()

router.post('/', auth, createTask)
router.get('/', auth, getAllTasksByUserId)
router.get('/:id', auth, getTaskByUserId)

export { router }
