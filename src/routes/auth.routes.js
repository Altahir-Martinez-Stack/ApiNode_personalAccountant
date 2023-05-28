import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller";

const router = Router();

router.post("/auth", signIn);
router.post("/auth/register", signUp);

export default router;
