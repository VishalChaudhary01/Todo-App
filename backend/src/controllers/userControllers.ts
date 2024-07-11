import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { prisma } from "../index";
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { signupSchema, signinSchema } from "../types/userSchema";


const signup = async (req: Request, res: Response) => {
     try {
          const validatedData = signupSchema.parse(req.body);
          const userExist = await prisma.user.findFirst({
               where: {
                    username: req.body.username,
               }
          });
          if (userExist) return res.status(400).json({ message: "email is already registerd" });

          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          
          const user = await prisma.user.create({
               data: {
                    ...validatedData,
                    password: hashPassword,
               }
          })
          const token = jwt.sign({ id: user.id }, "Vishal");
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
          const user = await prisma.user.findFirst({
               where: { 
                    username: validatedData.username
               }
          })
          if (!user) return res.status(404).json({ message: "Email is not registerd" });

          const matchPassword = await bcrypt.compare(validatedData.password, user.password);
          if (!matchPassword) return res.status(400).json({ message: "Invalid password" });

          const token = jwt.sign({ id: user.id }, "Vishal");
          res.status(200).json({ token: token });
     } catch (error) {
          if (error instanceof z.ZodError) {
               return res.status(400).json(error.errors[0].message);
          }
          res.status(500).json({ message: "Internal server error" });
     }
}

interface AuthRequest extends Request {
     id?: number
}

const getProfile = async (req: AuthRequest, res: Response) => {
     try {
          if (!req.id) return res.status(401).json({ message: "Unauthorized" });
          const user = await prisma.user.findFirst({
               where: {
                    id: req.id
               }
          });
          if (!user) return res.status(404).json({ message: "user not found"});
          res.status(200).json(user)
     } catch (error) {
          return res.status(500).json({ message: "Internal server error"});
     }
}

interface UpdatedData {
     firstName?: string;
     lastName?: string;
     password?: string;
}
const updateProfile = async (req: AuthRequest, res: Response) => {
     const updatedData: UpdatedData & { [key: string]: any } = req.body;
     try {
          if (!req.id) return res.status(401).json({ message: "Unauthorized" });
          let hashPassword: string | undefined;
          if (updatedData.password) {
               const salt = await bcrypt.genSalt(10);
               hashPassword = await bcrypt.hash(updatedData.password, salt);
          }
          const updateData = { ...updatedData };
          if (hashPassword) {
               updateData.password = hashPassword;
          }
          delete updateData.username;
          const updatedUser = await prisma.user.update({
               where: { id: req.id },
               data: updateData              
          })
          console.log("updated user: ", updatedUser);
          res.status(200).json({ message: "Updated successfully", updatedUser });
     } catch (error) {
          console.log(error)
          return res.status(500).json({ message: "Internal server error", error });
     }
}

export { signup, signin, getProfile, updateProfile }