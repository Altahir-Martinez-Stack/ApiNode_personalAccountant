import { Router } from "express";

import {
  getDetailType,
  getDetailTypeById,
  createNewDetailType,
  deleteDetailType,
  updateDetailType,
} from "../controllers/detailTypes.controller";

const router = Router();

router.get("/detailTypes", getDetailType);
router.post("/detailTypes", createNewDetailType);
router.get("/detailTypes/:id", getDetailTypeById);
router.delete("/detailTypes/:id", deleteDetailType);
router.put("/detailTypes/:id", updateDetailType);

export default router;
