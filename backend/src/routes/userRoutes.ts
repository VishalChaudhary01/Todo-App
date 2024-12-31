import { Router } from "express";
import { signin, signup, getProfile } from "../controllers/userControllers";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', isAuth, getProfile);

export default router;