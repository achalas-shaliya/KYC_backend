import { Router } from "express";
import { getSummary } from "../controllers/summaryController";
import { authenticateAdmin } from "../middleware/auth";

const router: Router = Router();

// Protected route (Requires JWT authentication)
router.get("/", authenticateAdmin, getSummary);

export default router;
