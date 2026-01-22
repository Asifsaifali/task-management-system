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

