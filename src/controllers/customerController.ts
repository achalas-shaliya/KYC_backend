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