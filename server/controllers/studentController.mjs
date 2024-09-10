import Student from './../models/studentModel.mjs';

const getStudents = async (_req, res) => {
    try {
        const students = await Student.findAll({
            where: {
                deletedAt: null
            }
        });
        res.status(200).json(students);
    } catch (error) {
        // Handle errors
        console.error('Failed to fetch students -> ', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

export default {
    getStudents
};
