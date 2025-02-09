import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET as string;

// ✅ Ensure function returns `Promise<void>`
export const adminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
