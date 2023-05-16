import { Router } from "express";
import { sendMailTo } from "../controllers/mail.controller";

const router = Router();

router.post("/mails", sendMailTo);

export default router;
