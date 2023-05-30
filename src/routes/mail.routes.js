import { Router } from "express";
import { sendMailTo } from "../controllers/mail.controller";
import { authJwt } from "../middlewares";

const router = Router();

router.post("/mails", [authJwt.verifyToken], sendMailTo);

export default router;
