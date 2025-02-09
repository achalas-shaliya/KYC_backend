import sequelize from "../config/database";
import User from "./user";
import Customer from "./customer";

// // Ensure models are properly associated AFTER importing them
User.hasOne(Customer, { foreignKey: "userId", as: "customerProfile", onDelete: "CASCADE" });
Customer.belongsTo(User, { foreignKey: "userId", as: "customerOwner" });

const db = {
  sequelize,
  User,
  Customer,
};

export default db;
export { User, Customer };
