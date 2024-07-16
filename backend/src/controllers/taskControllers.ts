import { Request, Response } from "express";
import { prisma } from "../index";
import { taskSchema } from "../types/taskSchema";
import { z } from "zod";

interface AuthRequest extends Request {
     id?: number
}

interface Task {
     title: string;
     description: string;
     done: boolean,
     userId: number;
}
const createTask = async (req: AuthRequest, res: Response) => {
     const task: Task = req.body;
     try {
          const validatedTask = taskSchema.parse(task);
          if (!req.id) return res.status(401).json({ message: "unauthorized" });
          task.userId = req.id;
          const exitTask = await prisma.todo.findFirst({
               where: {
                    title: validatedTask.title,
                    userId: req.id
               }
          })
          if (exitTask) {
               const updateTask = await prisma.todo.update({
                    where: {
                         id: exitTask.id,
                         userId: req.id,
                    },
                    data: task
               })
               return res.status(200).json({ message: "Task Updated successfully", updateTask });
          }
          const newTask = await prisma.todo.create({
               data: {
                    title: validatedTask.title,
                    description: validatedTask.description,
                    userId: req.id,
               }
          })
          res.status(201).json({ message: "Task added successfully", newTask });
     } catch (error) {
          if (error instanceof z.ZodError) {
               console.log(error.errors)
               return res.status(400).json(error.errors)
          }
          console.log(error);
          res.status(400).json({ message: "Something went wrong, Please try again", error });
     }
}

const deleteTask = async (req: AuthRequest, res: Response) => {
     const id = parseInt(req.params.id);
     try {
          const deletedTask = await prisma.todo.delete({
               where: {
                    id: id,
                    userId: req.id
               }
          });
          console.log(deletedTask)
          res.status(200).json({ message: "Task deleted successfully" });
     } catch (error) {
          console.log(error);
          res.status(400).json(error);
     }
}

const getAllTask = async (req: AuthRequest, res: Response) => {
     try {
          const todos = await prisma.todo.findMany({
               where: {
                    userId: req.id
               }
          })
          res.status(200).json(todos);
     } catch (error) {
          console.log(error);
          res.status(400).json(error);
     }
}

const getTaskById = async (req: AuthRequest, res: Response) => {
     try {
          const task = await prisma.todo.findFirst({
               where: {
                    id: parseInt(req.params.id),
                    userId: req.id
               }
          })
          res.status(200).json(task);
     } catch (error) {
          console.log(error);
          res.status(400).json(error);
     }
}

const updateTask = async (req: AuthRequest, res: Response) => {
     const taskData: Task = req.body;
     try {
          const updatedTask = await prisma.todo.update({
               where: {
                    id: parseInt(req.params.id),
                    userId: req.id,
               },
               data: taskData
          })
          res.status(200).json({ message: "Task Updated successfully", updatedTask });
     } catch (error) {
          console.log(error);
          res.status(400).json(error);
     }
}



export { createTask, deleteTask, getAllTask, getTaskById, updateTask }