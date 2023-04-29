import { Router } from "express";

import {
  getDetail,
  createNewDetail,
  getDetailById,
  deleteDetail,
  updateDetail,
  searchDetail,
} from "../controllers/details.controller";

const router = Router();

router.get("/details", getDetail);
router.post("/details", createNewDetail);
router.get("/details/:id", getDetailById);
router.delete("/details/:id", deleteDetail);
router.put("/details/:id", updateDetail);
router.post("/detailSearch", searchDetail);

export default router;
