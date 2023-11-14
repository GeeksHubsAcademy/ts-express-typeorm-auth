import express from 'express'
import 'dotenv/config'

import { router as routerUsers } from "./routes/usersRoutes";
import { router as routerTasks } from "./routes/tasksRoutes";

const app = express()

// middlewares
app.use(express.json())

// routes
app.get('/api/healthy', (req, res) => {
  return res.send('Healthy')
})

app.use('/user', routerUsers)
app.use('/tasks', routerTasks)

export default app
