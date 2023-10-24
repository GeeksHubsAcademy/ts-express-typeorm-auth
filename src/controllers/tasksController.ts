import { Request, Response } from "express";
import { Task } from "../models/Task";

const createTask = async(req: any, res: Response) => {
  try {
    //recuperar la info
    const title = req.body.title
    const description = req.body.description

    //validar si hace falta la info
    //tratar si hace falta la info

    const task = await Task.create(
      {
        title: title,
        description: description,
        user_id: req.token.id
      }
    ).save()

    return res.json(
      {
        success: true,
        message: "users retrieved",
        data: task
      }
    )
    
  } catch (error) {
    return res.json(
      {
        success: false,
        message: "task cant be created",
        error: error
      }
    )
  }
}

const getAllTasksByUserId = async(req: any, res: Response) => {
  try {
    const tasks = await Task.findBy(
      {
        user_id: req.token.id
      }
    )

    return res.json({
      success: true,
      message: "tasks by user retrieved",
      data: tasks
    })
  } catch (error) {
    return res.json({
      success: false,
      message: "tasks cant by user retrieved",
      error: error
    })
  }
}

const getTaskByUserId = async(req: any, res: Response) => {
  try {
    const taskId = req.params.id

    const task = await Task.findOneBy(
      {
        id: parseInt(taskId),
        user_id: req.token.id
      }
    )

    if (!task) {
      return res.status(404).json({
        success: true,
        message: "task by user doesnt found",
      })
    }

    return res.json({
      success: true,
      message: "task by user retrieved",
      data: task
    })
  } catch (error) {
    return res.json({
      success: false,
      message: "task cant by user retrieved",
      error: error
    })
  }
}

const updateTaskById = async(req: any, res: Response) => {
  try {
    // recuperamos la info
    const title = req.body.title
    const description = req.body.description
    const status = req.body.status

    // validar la info

    // comprobarmos si la task nos pertenece 
    const taskId = req.params.id

    const task = await Task.findOneBy(
      {
        id: parseInt(taskId),
        user_id: req.token.id
      }
    )

    if (!task) {
      return res.status(404).json({
        success: true,
        message: "task by user doesnt found and cant updated",
      })
    }

    const updateTask = await Task.update(
      {
        id: parseInt(taskId)
      },
      {
        title: title,
        description: description,
        status: status
      }
    )

    return res.json({
      success: true,
      message: "task updated",
      data: updateTask
    })
  } catch (error) {
    return res.json({
      success: false,
      message: "task cant by updated",
      error: error
    })
  }
}

export { createTask, getAllTasksByUserId, getTaskByUserId, updateTaskById }