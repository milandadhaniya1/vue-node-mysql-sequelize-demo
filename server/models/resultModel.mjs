import { DataTypes } from 'sequelize';
import sequelize from './../plugins/database.mjs';
import Subjects from './subjectModel.mjs';
import Student from './studentModel.mjs';
import Exams from './examsModel.mjs';

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

Results.belongsTo(Exams, {
    foreignKey: 'exam_id',
    targetKey: 'id',
});
Results.belongsTo(Student, {
    foreignKey: 'student_id',
    targetKey: 'id',
});
Results.belongsTo(Subjects, {
    foreignKey: 'subject_id',
    targetKey: 'id',
});

Exams.hasMany(Results, {
    foreignKey: 'exam_id',
    sourceKey: 'id',
});
Student.hasMany(Results, {
    foreignKey: 'student_id',
    sourceKey: 'id',
});
Subjects.hasMany(Results, {
    foreignKey: 'subject_id',
    sourceKey: 'id',
});

export default Results;