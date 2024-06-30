import { Router } from "express";
import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from "../controllers/taskControllers";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.get('/all-tasks', isAuth, getAllTask);
router.get('/:id',isAuth, getTaskById)
router.post('/create-task', isAuth, createTask);
router.put('/update-task/:id', isAuth, updateTask);
router.delete('/delete-task/:id', isAuth, deleteTask);

export default router;