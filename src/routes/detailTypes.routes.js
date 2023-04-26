import { Router } from "express";

import {
  getDetailType,
  getDetailTypeById,
  createNewDetailType,
  deleteDetailTypeById,
  updateDetailTypeById,
  getDetailTypeByDetailId,
} from "../controllers/detailTypes.controller";

const router = Router();

router.get("/detailType", getDetailType);
router.post("/detailType", createNewDetailType);
router.get("/detailType/:id", getDetailTypeById);
router.delete("/detailType/:id", deleteDetailTypeById);
router.put("/detailType/:id", updateDetailTypeById);
router.get("/detailTypeIdDeatil/:id", getDetailTypeByDetailId);

export default router;
