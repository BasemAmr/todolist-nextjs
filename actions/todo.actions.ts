'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient()

export const getTodoListAction = async (
    {user_id}: {user_id: string | null}
) => {
    const todoList = await prisma.todo.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            user_id: user_id as string  
        }
    })
    return todoList

    // ERROR HANDLING 

};
export const createTodoAction = async ( 
    {
        title,
        body,
        completed,
        user_id 
    } : {
        title: string,
        body: string,
        completed: boolean,
        user_id: string  | null
    }
  ) => {
    await prisma.todo.create({
        data: {
            title,
            body,
            completed,
            user_id: user_id as string
        }
    })
    revalidatePath("/")
};
export const updateTodoAction = async (todo: 
    {
        id: string,
        title: string,
        body: string,
        completed: boolean
    }
) => {
    await prisma.todo.update({
        where: {
            id: todo.id
        },
        data: {
            title: todo.title,
            body: todo.body,
            completed: todo.completed
        }
    })

};
export const deleteTodoAction = async (
    {id}: {id: string}
) => {
    console.log("Hi!", id);
    await prisma.todo.delete({
        where: {
            id,
        }
    })

    revalidatePath("/")
};