import { Request, Response, NextFunction } from "express";
import Customer from "../models/customer";
import { User } from "../models";
import { AuthRequest } from "../middleware/auth";

// Create & Save a New Customer (Only for Customers)
export const saveCustomer = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, document } = req.body;

    if (!name || !email || !document) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (req.user.role !== "customer") {
      res.status(403).json({ message: "Only customers can register" });
      return;
    }

    const newCustomer = await Customer.create({
      userId: req.user.id, //  Link customer to logged-in user
      name,
      email,
      document,
      status: "pending",
    });

    res.status(201).json({ message: "Customer saved successfully", customer: newCustomer });
  } catch (error) {
    next(error);
  }
};

// Get Customers (Admins/Managers see all, Customers see their own)
export const getCustomers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const whereClause = req.user.role === "customer" ? { userId: req.user.id } : {};

    const customers = await Customer.findAll({
      where: whereClause,
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] }, //  Fetch user details
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    res.json({ data: customers, hasMore: customers.length === limit });
  } catch (error) {
    next(error);
  }
};

// Update Customer Status (Admins/Managers Only)
export const updateCustomerStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (req.user.role !== "admin" && req.user.role !== "manager") {
      res.status(403).json({ message: "Forbidden: You cannot update status" });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    const customer = await Customer.findByPk(id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    await customer.update({ status });

    res.json({ message: `Customer status updated to ${status}` });
  } catch (error) {
    next(error);
  }
};
