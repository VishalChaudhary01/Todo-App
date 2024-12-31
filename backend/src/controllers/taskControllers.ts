import { Response } from "express";
import { taskSchema, TaskSchemaType } from "../types/taskType";
import { z } from "zod";
import { Task } from "../models/Task";
import { AuthRequest } from "../middlewares/auth";

const createTask = async (req: AuthRequest, res: Response) => {
     const task: TaskSchemaType = req.body;
     try {
          if (!req.id) return res.status(401).json({ message: "Unauthorized" });
          task.userId = req.id;
          const validatedTask = taskSchema.parse(task);
          const exitTask = await Task.findOne({
               title: validatedTask.title,
               userId: validatedTask.userId,
          });
          if (exitTask) return res.status(400).json({ message: "Task is already listed" });
          const newTask = await Task.create({
               title: validatedTask.title,
               description: validatedTask.description,
               userId: req.id,
          });
          console.log("new task::", newTask)
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
     const id = req.params.id;
     try {
          if (!req.id) return res.status(401).json({ message: "Unauthorized" });
          const deletedTask = await Task.findOneAndDelete({
               _id: id,
               userId: req.id
          });
          if (!deletedTask) return res.status(404).json({ message: "Task not found"})
          res.status(200).json({ message: "Task deleted successfully" });
     } catch (error) {
          console.log(error);
          res.status(400).json(error);
     }
}

const getAllTask = async (req: AuthRequest, res: Response) => {
     try {
          if (!req.id) return res.status(401).json({ message: "Unauthorized" });
          const todos = await Task.find({ userId: req.id });
          res.status(200).json(todos);
     } catch (error) {
          console.log(error);
          res.status(400).json(error);
     }
}

const getTaskById = async (req: AuthRequest, res: Response) => {
     const id = req.params.id;
     try {
          if (!req.id) return res.status(401).json({ message: "Unauthorized" });
          const task = await Task.findOne({
               _id: id,
               userId: req.id
          });
          if (!task) return res.status(404).json({ message: "Task not found" });
          res.status(200).json(task);
     } catch (error) {
          console.log(error);
          res.status(400).json(error);
     }
}

const updateTask = async (req: AuthRequest, res: Response) => {
     const id = req.params.id;
     const taskData: Partial<TaskSchemaType> = req.body;
     try {
          if (!req.id) return res.status(401).json({ message: "Unauthorized" });
          const updatedTask = await Task.findOneAndUpdate(
               { _id: id, userId: req.id },
               taskData,
               { new: true, runValidators: true },
          );
          if (!updatedTask) return res.status(404).json({ message: "Task not found"});
          res.status(200).json({ message: "Task Updated successfully", updatedTask });
     } catch (error) {
          console.log(error);
          res.status(400).json(error);
     }
}

export { createTask, deleteTask, getAllTask, getTaskById, updateTask }