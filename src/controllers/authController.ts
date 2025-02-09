import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { Customer } from "../models";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    // If the user is a customer, create a CUSTOMER entry
    if (role === "customer") {
      await Customer.create({ userId: user.id, status: "pending" });
    }

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });


    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT including role
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
