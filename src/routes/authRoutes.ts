import { Router } from "express";
import { login, register } from "../controllers/authController";
import asyncHandler from "../middleware/asyncHandler"; //  Move asyncHandler to middleware

const router: Router = Router();

router.post("/login", asyncHandler(login)); //  Login for all users (Admin, Manager, Customer)
router.post("/register", asyncHandler(register)); //  Register a new user

export default router;
