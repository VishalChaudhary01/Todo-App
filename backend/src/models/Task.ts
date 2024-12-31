import mongoose from 'mongoose';
import { ITaskSchema } from '../types/taskType';

const taskSchema = new mongoose.Schema<ITaskSchema>(
     {
          userId: {
               type: mongoose.Types.ObjectId,
               ref: 'User',
               required: true,
          },
          title: {
               type: String,
               required: true,
          },
          description: {
               type: String,
               required: true,
               unique: true,
          },
          done: {
               type: Boolean,
               default: false,
               requried: true,
          },
     },
     { timestamps: true },
);

export const Task = mongoose.model<ITaskSchema>("Task", taskSchema);