import { Router } from "express";
import * as groupCtrl from "../controllers/group.controller";
import { authJwt } from "../middlewares";
import { verifyToken } from "../middlewares/authJwt";

const router = Router();

router.post("/", verifyToken, groupCtrl.createGroup);

router.get("/", groupCtrl.getGroups);

router.get("/:groupId", groupCtrl.getGroupById);

router.put("/:groupId", authJwt.verifyToken, groupCtrl.updateGroupById);

router.delete("/:groupId", authJwt.verifyToken, groupCtrl.deleteGroupById);

export default router;
