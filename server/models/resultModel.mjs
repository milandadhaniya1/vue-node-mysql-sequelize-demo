import { DataTypes } from 'sequelize';
import sequelize from './../plugins/database.mjs';

const Results = sequelize.define("results", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'students',
            key: 'id',
        }
    },
    exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'exams',
            key: 'id',
        }
    },
    subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'subjects',
            key: 'id',
        }
    },
    total: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    score: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'results'
});

export default Results;