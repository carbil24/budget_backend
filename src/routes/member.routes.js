import { Router } from "express";
import * as memberCtrl from "../controllers/member.controller";
import { authJwt } from "../middlewares";

const router = Router();

router.post("/", memberCtrl.createMember);

router.get("/", memberCtrl.getMembers);

router.get("/:memberId", memberCtrl.getMemberById);

router.put("/:memberId", authJwt.verifyToken, memberCtrl.updateMemberById);

router.delete("/:memberId", authJwt.verifyToken, memberCtrl.deleteMemberById);

export default router;
