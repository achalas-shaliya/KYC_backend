import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

//  Extend Request type to include `user`
export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

//  Middleware to Authenticate Any User
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    req.user = decoded; //  Store user details in request object

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

//  Role-Based Authorization Middleware
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) : void => {
    if (!req.user) {
       res.status(401).json({ message: "Unauthorized: Please log in" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
       res.status(403).json({ message: "Forbidden: You don't have permission" });
      return;
    }

    next();
  };
};
