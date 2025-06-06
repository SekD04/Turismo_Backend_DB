// src/config/database.config.js
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false, // Cambiar a console.log para debug
        define: {
            timestamps: false // Para que Sequelize no intente crear createdAt/updatedAt automáticamente
        }
    }
);

export default sequelize;
