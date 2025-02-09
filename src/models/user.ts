import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Customer from "./customer";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "customer", "manager"), allowNull: false },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

// A USER Can Have A CUSTOMER Profile (Only if role = "customer")
// User.hasOne(Customer, { foreignKey: "userId", as: "customerProfile", onDelete: "CASCADE" });

export default User;
