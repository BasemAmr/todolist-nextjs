'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache';
import { ServerActionError } from '@/lib/exceptions'

const prisma = new PrismaClient()

export const getTodoListAction = async ({user_id}: {user_id: string | null}) => {
    try {
        if (!user_id) {
            throw new ServerActionError('User ID is required', 400)
        }

        const todoList = await prisma.todo.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                user_id: user_id as string  
            }
        })
        return todoList
    } catch (error) {
        if (error instanceof ServerActionError) {
            throw error
        }
        console.error('Get todo list error:', error)
        throw new ServerActionError('Failed to fetch todos')
    }
};

// createTodoAction remains the same

export const updateTodoAction = async (todo: {
    id: string,
    title: string,
    body: string,
    completed: boolean
}) => {
    try {
        if (!todo.id) {
            throw new ServerActionError('Todo ID is required', 400)
        }
        if (!todo.title) {
            throw new ServerActionError('Title is required', 400)
        }

        const result = await prisma.todo.update({
            where: { id: todo.id },
            data: {
                title: todo.title,
                body: todo.body,
                completed: todo.completed
            }
        })
        revalidatePath("/")
        return { success: true, data: result }
    } catch (error) {
        if (error instanceof ServerActionError) {
            throw error
        }
        console.error('Update todo error:', error)
        throw new ServerActionError('Failed to update todo')
    }
};

export const deleteTodoAction = async ({id}: {id: string}) => {
    try {
        if (!id) {
            throw new ServerActionError('Todo ID is required', 400)
        }

        await prisma.todo.delete({
            where: { id }
        })
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        if (error instanceof ServerActionError) {
            throw error
        }
        console.error('Delete todo error:', error)
        throw new ServerActionError('Failed to delete todo')
    }
};
