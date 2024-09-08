import { DataTypes } from 'sequelize';
import sequelize from './../plugins/database.mjs';

const Subjects = sequelize.define("subjects", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'subjects',
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
});

export default Subjects;