import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getSummary } from "../controllers/summaryController";
import { authenticateUser, authorizeRoles } from "../middleware/auth";

const router: Router = Router();

router.get("/", authenticateUser, authorizeRoles("admin", "manager"), asyncHandler(getSummary));

export default router;
