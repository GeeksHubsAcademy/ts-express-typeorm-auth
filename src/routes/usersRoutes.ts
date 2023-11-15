import { Router } from "express";
import { deleteUserById, getAllUsers, login, profile, register } from "../controllers/usersController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.post('/register', register)
router.post('/login', login)

router.get('/profile', auth, profile)

router.get('/all', auth, isSuperAdmin, getAllUsers)
router.delete('/remove/:id', auth, deleteUserById)

export { router }
