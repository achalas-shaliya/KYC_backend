import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";
import uploadRoutes from './routes/uploadRoutes';
import db from "./models"; // Ensure models are imported correctly

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/upload", uploadRoutes);

// Sequelize is connecting before starting the server
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected.");
    return db.sequelize.sync(); // Sync tables
  })
  .then(() => {
    console.log("Tables synced.");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
