import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app: Application = express();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors<Request>());
app.use(express.json());

app.get('/test-db', async (req: Request, res: Response) => {
     try {
          await prisma.$connect();
          res.status(200).json({ message: "Database is connected"})
     } catch (error) {
          res.status(500).json({ message: "Database connection failed", error})          
     }
})

app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export { prisma };