import { Router } from "express";
import { createTask, getAllTasksByUserId, getTaskByUserId, getTasksAssignedByUser, updateTaskById } from "../controllers/tasksController";
import { auth } from "../middlewares/auth";

const router = Router()

router.post('/', auth, createTask)
router.get('/', auth, getAllTasksByUserId)
router.get('/user/assigned', auth, getTasksAssignedByUser)
router.get('/:id', auth, getTaskByUserId)
router.put('/:id', auth, updateTaskById)

export { router }
