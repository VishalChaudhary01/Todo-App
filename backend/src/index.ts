import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectToDB } from './config/db';

import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();
connectToDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))