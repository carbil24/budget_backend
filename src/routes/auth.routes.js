import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { inputValidation } from "../middlewares";

const router = Router();

router.post("/register", inputValidation.register, authCtrl.register);

router.post("/login", inputValidation.login, authCtrl.login);

router.post("/token", authCtrl.verifyToken);

export default router;
