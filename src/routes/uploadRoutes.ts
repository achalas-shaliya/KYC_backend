import { NextFunction, Router } from "express";
import { uploadFile } from "../controllers/uploadController";
import { authenticateAdmin } from "../middleware/auth";

const router: Router = Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// ✅ File upload route (without Multer)
router.post("/", uploadFile);

export default router;
