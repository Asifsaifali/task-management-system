import { Request, Response } from "express";
import * as task from "./task.services";

async function createTask(req: Request, res: Response) {
  try {
    const { title } = req.body;
    const userId = req.user.userId;
    console.log("USER ID IN CONTROLLER:", userId);
    console.log("TITLE IN CONTROLLER:", title);
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



async function getTasks(req:Request, res:Response){
    try {
        const userId = req.user.userId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string ) || 10;
        const tasks = await task.getTasks(userId, page, limit);
        return res.status(200).json({
            message: "Tasks fetched successfully",
            data: tasks,
            success: true,
            page,
            limit
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in fetching tasks",
            success: false
        })
    }
}



export { createTask, getTasks };
