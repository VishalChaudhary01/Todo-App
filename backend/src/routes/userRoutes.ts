import { Router } from "express";
import { signin, signup, getProfile, updateProfile } from "../controllers/userControllers";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', isAuth, getProfile);
router.put('/update-profile', isAuth, updateProfile);

export default router;