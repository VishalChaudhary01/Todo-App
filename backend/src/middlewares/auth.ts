import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
     id?: string;
}

export const isAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
     try {
          const authorization = req.headers.authorization;
          const token = authorization?.split(" ")[1];
          if (!token) return res.status(404).json({ message: "No Token found" });
          jwt.verify(token, process.env.JWT_SECRET || "jwt-secret", (err, decoded) => {
               if (err) return res.status(400).json({ message: "Invalid token" });
               const user = decoded as JwtPayload;
               if (user && user.id) {
                    req.id = user.id
                    next();
               } else {
                    return res.status(400).json({ message: "Invalid token payload" });
               }
          })
     } catch (error) {
          console.log(error)
          return res.status(500).json({ message: "Internal server error" });
     }
}