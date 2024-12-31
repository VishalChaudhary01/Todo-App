import mongoose from 'mongoose';
import { UserSchemaType } from '../types/userType';

const userSchema = new mongoose.Schema<UserSchemaType>({
     name: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
          unique: true,
     },
     password: {
          type: String,
          required: true,
     }
});

export const User = mongoose.model<UserSchemaType>("User", userSchema);