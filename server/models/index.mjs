import sequelize from './../plugins/database.mjs';

// Import models here
import Student from './studentModel.mjs';
import Subjects from './subjectModel.mjs';
import Exams from './examsModel.mjs';
import Results from './resultModel.mjs';
import Grade from './gradeModel.mjs';
import ResultsSummary from './resultsSummaryModel.mjs';

const db = {
    sequelize,
    Student,
    Subjects,
    Exams,
    Results,
    Grade,
    ResultsSummary
};

export default db;
