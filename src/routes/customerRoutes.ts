import { Router, Request, Response, NextFunction } from "express";
import { saveCustomer } from "../controllers/customerController";

const router: Router = Router();

// ✅ Async wrapper to handle errors properly
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// ✅ New API for Saving Customer
router.post("/", asyncHandler(saveCustomer));

export default router;
