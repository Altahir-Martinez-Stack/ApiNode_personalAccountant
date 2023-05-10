import { Router } from "express";
import { prueba } from "../controllers/mail.controller";

const router = Router();

router.post("/Mails", prueba);

export default router;
