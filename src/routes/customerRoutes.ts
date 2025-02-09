import { Router, Request, Response, NextFunction } from "express";
import { getCustomers, saveCustomer, updateCustomerStatus } from "../controllers/customerController";
import { authenticateAdmin } from "../middleware/auth";

const router: Router = Router();

// ✅ Async wrapper to handle errors properly
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// ✅ New API for Saving Customer
router.post("/", asyncHandler(saveCustomer));
router.get("/", authenticateAdmin, asyncHandler(getCustomers));
router.patch("/:id", authenticateAdmin, asyncHandler(updateCustomerStatus));

export default router;
