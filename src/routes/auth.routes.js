import { Router } from "express";
import { registerLogin, login } from "../controllers/auth.controller";

const router = Router();

router.post("/auth", login);
router.post("/auth/register", registerLogin);

export default router;
