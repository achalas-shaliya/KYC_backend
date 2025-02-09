import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";
import authRoutes from "./routes/authRoutes";
import summaryRoutes from "./routes/summaryRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import db from "./models";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "*", // Allow frontend domain
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "🚀 API is running!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/customers", customerRoutes); 

// Global Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start the server after DB connection is established
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected.");

    await db.sequelize.sync();
    console.log("Tables synced.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer(); //Start server
