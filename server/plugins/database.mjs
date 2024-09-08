import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql'
    }
);

try {
    await sequelize.authenticate();
    console.log('Database connected...');
} catch (err) {
    console.error('Unable to connect to the database:', err);
}

export default sequelize;