import { DataTypes } from 'sequelize';
import sequelize from './../plugins/database.mjs';

const ResultsSummary = sequelize.define("resultsSummary", {
    exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    exam_code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    exam_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    student_enrollment_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    student_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    score: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    percentage: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'exam_results_summary',
    timestamps: false
});

// To avoid table creation (This model is for view - exam_results_summary)
ResultsSummary.sync = () => Promise.resolve();

export default ResultsSummary;