import prisma from "../utils/prisma";

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "completed";
    userId: string;
}

export interface GetTasksParams {
    userId: string;
    page: number;
    limit: number;
    completed?: boolean;
    search?: string;
}


export async function createTask(userId: string, title: string) {

    const task = await prisma.task.create({
        data: {
            title,
            userId
        }
    })
    return task;
}

export async function getTasks({ userId, page, limit, completed, search }: GetTasksParams) {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId,
                ...(completed !== undefined && { completed }),
                ...(search && { title: { contains: search, mode: "insensitive" } })
            },
            skip: (page - 1) * limit,
            take: limit
        })
        return tasks;
    } catch (error) {
        throw error;
    }
}

export async function getTaskById(userId: string, taskId: string){
    try {
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                 userId
            }
        })

        return task;
    } catch (error) {
        throw error;
    }
}


export async function deleteTask(userId: string, taskId: string){
    try {
        const task = await prisma.task.deleteMany({
            where:{
                id:taskId,
                userId
            }
        })
    } catch (error) {
        throw error;
    }
}

export async function updateTask(userId: string, taskId:string, update: Partial<Task>){
    try {
        const task = await prisma.task.updateMany({
            where:{
                id:taskId,
                userId,
            },
            data:update
        })
        return task;
    } catch (error) {
        throw error;
    }
}

export async function toggleTaskCompletion(userId: string, taskId: string, completed: boolean){
    try {
        const task = await prisma.task.findFirst({
            where:{
                id: taskId,
                userId
            }
        })

        if(!task){
            throw new Error("Task not found");
        }

        return await prisma.task.update({
            where:{
                id: taskId
            },
            data:{
                completed
            }
        })
    } catch (error) {
        throw error;
    }
}