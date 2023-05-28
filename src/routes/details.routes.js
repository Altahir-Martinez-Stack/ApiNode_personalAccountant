import { Router } from "express";
import { authJwt } from "../middlewares";

import {
  getDetail,
  createNewDetail,
  getDetailById,
  deleteDetail,
  updateDetail,
  searchDetail,
} from "../controllers/details.controller";

const router = Router();

router.get("/details", [authJwt.verifyToken], getDetail);
router.post("/details", createNewDetail);
router.get("/details/:id", getDetailById);
router.delete("/details/:id", deleteDetail);
router.put("/details/:id", updateDetail);
router.post("/detailSearch", searchDetail);

export default router;
