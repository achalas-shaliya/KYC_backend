import { Router, Request, Response, NextFunction } from "express";
import { adminLogin } from "../controllers/authController";

const router: Router = Router();

// ✅ Async wrapper to handle errors correctly
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// ✅ Apply asyncHandler to avoid TypeScript overload errors
router.post("/login", asyncHandler(adminLogin));

export default router;
