import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

class Customer extends Model {
  public id!: number;
  public userId!: number;
  public status!: string;
}

Customer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    status: { type: DataTypes.ENUM("pending", "approved", "rejected"), allowNull: false, defaultValue: "pending" },
    document: { type: DataTypes.STRING, allowNull: true }, // Allows storing document URL
  },
  {
    sequelize,
    tableName: "customers",
    timestamps: true,
  }
);

// CUSTOMER Belongs to USER
Customer.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Customer;
