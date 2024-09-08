import Subjects from './../models/subjectModel.mjs';

const getSubjects = async (_req, res) => {
    try {
        const exams = await Subjects.findAll({
            where: {
                deletedAt: null
            }
        });
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subjects' });
    }
};

export default {
    getSubjects
};
