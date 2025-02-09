import { Request, Response, NextFunction } from "express";
import Customer from "../models/customer";

// Create and Save a New Customer
export const saveCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, document } = req.body;

    if (!name || !email || !document) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newCustomer = await Customer.create({ name, email, document, status: 'pending' });

    res.status(201).json({ message: "Customer saved successfully", customer: newCustomer });
  } catch (error) {
    next(error);
  }
};

// Ensure function returns `Promise<void>`
export const getCustomers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const customers = await Customer.findAll({ limit, offset,order:[['id','DESC']] });

    res.json({ data: customers, hasMore: customers.length === limit });
  } catch (error) {
    next(error);
  }
};

// Ensure function returns `Promise<void>`
export const updateCustomerStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
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

    res.json({ message: `Customer status updated to ${status}`, data: customer });
  } catch (error) {
    next(error);
  }
};
