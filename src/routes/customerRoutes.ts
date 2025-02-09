import { Router } from "express";
import { getCustomers, saveCustomer, updateCustomerStatus } from "../controllers/customerController";
import { authenticateUser, authorizeRoles } from "../middleware/auth";
import asyncHandler from "../middleware/asyncHandler"; //  Use asyncHandler from middleware

const router: Router = Router();

//  Allow only Admins & Managers to fetch customers
router.get("/", authenticateUser, authorizeRoles("admin", "manager"), asyncHandler(getCustomers));

//  Allow only Admins & Managers to update status
router.patch("/:id", authenticateUser, authorizeRoles("admin", "manager"), asyncHandler(updateCustomerStatus));

export default router;
