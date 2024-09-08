import { DataTypes } from 'sequelize';
import sequelize from './../plugins/database.mjs';

const Exams = sequelize.define("exams", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    year: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    exam_code: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true, // This enables `deletedAt` functionality,
    tableName: 'exams',
    indexes: [
        {
            unique: false,
            fields: ['title']
        },
        {
            unique: false,
            fields: ['year']
        }
    ]
});

export default Exams;