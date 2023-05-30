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
router.post("/details", [authJwt.verifyToken], createNewDetail);
router.get("/details/:id", [authJwt.verifyToken], getDetailById);
router.delete("/details/:id", [authJwt.verifyToken], deleteDetail);
router.put("/details/:id", [authJwt.verifyToken], updateDetail);
router.post("/detailSearch", [authJwt.verifyToken], searchDetail);

export default router;
