import { Router } from "express";

import {
  getDetail,
  createNewDetail,
  getDetailById,
  deleteDetailById,
  updateDetailById,
  searchDetail,
} from "../controllers/details.controller";

const router = Router();

router.get("/detail", getDetail);
router.post("/detail", createNewDetail);
router.get("/detail/:id", getDetailById);
router.delete("/detail/:id", deleteDetailById);
router.put("/detail/:id", updateDetailById);
router.post("/detailSearch", searchDetail);

export default router;
