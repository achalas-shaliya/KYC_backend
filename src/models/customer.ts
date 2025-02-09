import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database"; // Import Sequelize connection

interface CustomerAttributes {
  id: number;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  document?: string;
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, "id"> { }

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public status!: "pending" | "approved" | "rejected";
  public document?: string;
}

Customer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: { type: DataTypes.ENUM("pending", "approved", "rejected"), defaultValue: "pending" },
    document: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: "customers",
  }
);

export default Customer;
