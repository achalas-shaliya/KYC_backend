import { Request, Response, NextFunction } from "express";
import Customer from "../models/customer";

export const getSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalCustomers = await Customer.count();
    const approvedCount = await Customer.count({ where: { status: "approved" } });
    const rejectedCount = await Customer.count({ where: { status: "rejected" } });
    const pendingCount = await Customer.count({ where: { status: "pending" } });

    res.json({
      totalCustomers,
      approvedCount,
      rejectedCount,
      pendingCount,
    });
  } catch (error) {
    next(error);
  }
};
