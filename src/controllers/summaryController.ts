import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth";
import Customer from "../models/customer";

//  Fix: Ensure `req.user` exists before accessing its properties
export const getSummary = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: Please log in" });
      return;
    }

    if (req.user.role !== "admin" && req.user.role !== "manager") {
      res.status(403).json({ message: "Forbidden: You don't have permission" });
      return;
    }

    const totalCustomers = await Customer.count();
    const approvedCount = await Customer.count({ where: { status: "approved" } });
    const pendingCount = await Customer.count({ where: { status: "pending" } });
    const rejectedCount = await Customer.count({ where: { status: "rejected" } });

    res.json({ totalCustomers, approvedCount, pendingCount, rejectedCount });
    return;
  } catch (error) {
    next(error);
  }
};
