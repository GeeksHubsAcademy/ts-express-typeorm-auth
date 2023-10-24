import { Router } from "express";
import { createTask, getAllTasksByUserId, getTaskByUserId, updateTaskById } from "../controllers/tasksController";
import { auth } from "../middlewares/auth";

const router = Router()

router.post('/', auth, (req, res) => { req.token }, createTask)
router.get('/', auth, getAllTasksByUserId)
router.get('/:id', auth, getTaskByUserId)
router.put('/:id', auth, updateTaskById)

export { router }
