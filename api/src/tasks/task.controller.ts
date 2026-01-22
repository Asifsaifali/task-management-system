import { Request, Response } from "express";
import * as task from "./task.services";

async function createTask(req: Request, res: Response) {
  try {
    const { title } = req.body;
    const userId = req.user.userId;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const data = await task.createTask(userId, title);

    return res.status(201).json({
      message: "Task created successfully",
      data
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error in task creation"
    });
  }
}



async function getTasks(req: Request, res: Response) {
  try {
    console.log("Fetching tasks with query:", req.query);
    const userId = req.user.userId;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const completed =
      req.query.completed !== undefined
        ? req.query.completed === "true"
        : undefined;

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const tasks = await task.getTasks({
      userId,
      page,
      limit,
      completed,
      search
    });

      console.log("Fetched tasks:", tasks);
    return res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
      success: true,
      page,
      limit
    });
  } catch (error) {
    return res.status(500).json({
      message: {error},
      success: false
    });
  }
}

async function getTaskById(req:Request, res: Response){
  try {

    const userId = req.user.userId;
    const taskId = req.params.id;

    

    
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error in fetching task by ID"
    });
  }
}




export { createTask, getTasks };
