import Exams from './../models/examsModel.mjs';

const getExams = async (_req, res) => {
    try {
        const exams = await Exams.findAll({
            where: {
                deletedAt: null
            }
        });
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exams' });
    }
};

export default {
    getExams
};
