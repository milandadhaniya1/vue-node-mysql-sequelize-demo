// This script sets up associations between models and creates a view in the database.
import sequelize from './../plugins/database.mjs';
import Models from './index.mjs';
import ResultsSummaryModelView from './resultsSummaryModelView.mjs';

Models.Exams.hasMany(Models.Results, {
    foreignKey: 'exam_id',
    sourceKey: 'id',
});

Models.Student.hasMany(Models.Results, {
    foreignKey: 'student_id',
    sourceKey: 'id',
});

Models.Subjects.hasMany(Models.Results, {
    foreignKey: 'subject_id',
    sourceKey: 'id',
});

Models.Results.belongsTo(Models.Exams, {
    foreignKey: 'exam_id',
    targetKey: 'id',
});
Models.Results.belongsTo(Models.Student, {
    foreignKey: 'student_id',
    targetKey: 'id',
});
Models.Results.belongsTo(Models.Subjects, {
    foreignKey: 'subject_id',
    targetKey: 'id',
});

// Sync all models with the database to apply changes
await sequelize.sync();

// Create a view summarizing the results
await ResultsSummaryModelView();