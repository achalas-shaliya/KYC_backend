import { Sequelize } from "sequelize";
import mysql2 from "mysql2"; // ✅ Import mysql2
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: "mysql",
    logging: false,
    dialectModule: mysql2, // ✅ Use mysql2 explicitly
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected.");

        // ✅ Ensure proper sync behavior
        await sequelize.sync({ alter: false }); 
        console.log("✅ Tables are synced.");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
})();

export default sequelize;
