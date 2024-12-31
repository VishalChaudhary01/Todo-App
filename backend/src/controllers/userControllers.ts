import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { signupSchema, signinSchema } from "../types/userType";
import { User } from "../models/User";
import { AuthRequest } from "../middlewares/auth";

const signup = async (req: Request, res: Response) => {
     try {
          const validatedData = signupSchema.parse(req.body);
          const userExist = await User.findOne({ email: validatedData.email });
          if (userExist) return res.status(400).json({ message: "Email is already registerd" });
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(validatedData.password, salt);
          const user = await User.create({
               name: validatedData.name,
               email: validatedData.email,
               password: hashPassword,
          });
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "jwt-secret");
          res.status(201).json({ token: token });
     } catch (error) {
          if (error instanceof z.ZodError) {
               return res.status(400).json(error.errors[0].message);
          }
          res.status(500).json({ message: "Internal server error" });
     }
}

const signin = async (req: Request, res: Response) => {
     try {
          const validatedData = signinSchema.parse(req.body);
          const user = await User.findOne({ email: validatedData.email });
          if (!user) return res.status(404).json({ message: "Email is not registerd" });
          const matchPassword = await bcrypt.compare(validatedData.password, user.password);
          if (!matchPassword) return res.status(400).json({ message: "Invalid password" });
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "jwt-secret");
          res.status(200).json({ token: token });
     } catch (error) {
          if (error instanceof z.ZodError) {
               return res.status(400).json(error.errors[0].message);
          }
          res.status(500).json({ message: "Internal server error" });
     }
}

const getProfile = async (req: AuthRequest, res: Response) => {
     try {
          if (!req.id) return res.status(401).json({ message: "Unauthorized" });
          const user = await User.findById(req.id);
          if (!user) return res.status(404).json({ message: "user not found"});
          res.status(200).json(user)
     } catch (error) {
          return res.status(500).json({ message: "Internal server error"});
     }
}

export { signup, signin, getProfile }