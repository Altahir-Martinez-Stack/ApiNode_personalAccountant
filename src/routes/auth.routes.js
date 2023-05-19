import { Router } from "express";
import {
  registerLogin,
  login,
  token,
  privates,
} from "../controllers/auth.controller";

const router = Router();

router.post("/auth", login);
router.post("/auth/register", registerLogin);
router.post("/auth/token", token);
router.get("/auth/private", privates);

export default router;
