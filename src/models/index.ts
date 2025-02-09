import sequelize from "../config/database";
import Customer from "./customer";

// ✅ Ensure Sequelize is initialized before exporting models
const db = {
  sequelize,
  Customer,
};

export default db;
