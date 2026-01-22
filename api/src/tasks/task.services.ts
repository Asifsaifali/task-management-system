import prisma from "../utils/prisma";

interface Task{
    id: string;
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "completed";
    userId: string;
    page: number;
    limit: number;
    completed: boolean;
}


export async function createTask(userId: string, title: string){

    const task = await prisma.task.create({
        data: {
            title,
            userId
        }  
    })
    return task;
}

export async function getTasks(userId:string, page:number, limit:number){
    try {
        const tasks = await prisma.task.findMany({
            where: {userId},
            skip: (page - 1) * limit,
            take: limit
         }) 
         return tasks;
    } catch (error) {
        throw error;
    }
}