import { ObjectId } from "mongoose";
import { z } from "zod";

export const taskSchema = z.object({
     userId: z.string(),
     title: z.string(),
     description: z.string().optional(),
     done: z.boolean().optional(),
});

export type TaskSchemaType = z.infer<typeof taskSchema>;

export interface ITaskSchema extends Omit<TaskSchemaType, 'userId'>{
     userId: ObjectId
}