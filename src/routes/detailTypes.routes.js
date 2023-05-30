import { Router } from "express";

import {
  getDetailType,
  getDetailTypeById,
  createNewDetailType,
  deleteDetailType,
  updateDetailType,
  searchDetailType,
} from "../controllers/detailTypes.controller";
import { authJwt } from "../middlewares";

const router = Router();

router.get("/detailTypes", [authJwt.verifyToken], getDetailType);
router.post("/detailTypes", [authJwt.verifyToken], createNewDetailType);
router.get("/detailTypes/:id", [authJwt.verifyToken], getDetailTypeById);
router.delete("/detailTypes/:id", [authJwt.verifyToken], deleteDetailType);
router.put("/detailTypes/:id", [authJwt.verifyToken], updateDetailType);
router.post("/detailTypeSearch", [authJwt.verifyToken], searchDetailType);

export default router;
