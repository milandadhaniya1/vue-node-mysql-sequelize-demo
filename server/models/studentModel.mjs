import { DataTypes } from 'sequelize';
import sequelize from './../plugins/database.mjs';

const Student = sequelize.define("students", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone_no: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    enrollment_id: {
        type: DataTypes.BIGINT(12),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'students',
    indexes: [
        {
            unique: false,
            fields: ['first_name']
        },
        {
            unique: false,
            fields: ['last_name']
        },
        {
            unique: true,
            fields: ['enrollment_id']
        }
    ]
});

export default Student;