import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).admin = decoded;
    
    next(); // Ensures request proceeds to next middleware/route
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
