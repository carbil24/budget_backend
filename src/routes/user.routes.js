import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { authJwt } from "../middlewares";

const router = Router();

router.get("/", authJwt.verifyToken, userCtrl.getUser);

export default router;
