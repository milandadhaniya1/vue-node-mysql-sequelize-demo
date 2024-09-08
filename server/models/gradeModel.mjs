import { DataTypes } from 'sequelize';
import sequelize from './../plugins/database.mjs';

const Grade = sequelize.define("grade", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    min: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    max: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    grade: {
        type: DataTypes.STRING(1),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'grade'
});

export default Grade;