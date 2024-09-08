import Results from './../models/resultModel.mjs';
import Subjects from './../models/subjectModel.mjs';
import ResultsSummary from './../models/resultsSummaryModel.mjs';

const getResultSummary = async (req, res) => {
    try {
        const student_id = req.query?.student_id;
        const whereCondition = {};
        if (student_id) {
            whereCondition.student_id = student_id;
        }
        const results = await ResultsSummary.findAll({
            where: whereCondition
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch results summary' });
    }
};

const getResultDetails = async (req, res) => {
    try {
        const student_id = req.query?.student_id;
        const exam_id = req.query?.exam_id;

        if (!student_id || !exam_id) {
            res.status(400).json({ error: 'Bad Request' });
        }
        const results = await Results.findAll({
            where: {
                student_id,
                exam_id,
                deletedAt: null
            },
            include: [
                {
                    model: Subjects,
                    attributes: ['name'],
                },
            ],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch result details' });
    }
};

const updateOrCreateResult = async (req, res) => {
    try {
        const data = req.body;

        if (data.student_id
            && data.exam_id
            && data.subject_id
            && data.total
            && data.obtained
        ) {
            // Find Result
            const isResultAvailable = await Results.findOne({
                where: {
                    student_id: data.student_id,
                    exam_id: data.exam_id,
                    subject_id: data.subject_id,
                    deletedAt: null
                }
            });
            // If result is not available, create result else update result
            if (isResultAvailable === null) {
                // Create result
                try {
                    await Results.create({
                        student_id: data.student_id,
                        exam_id: data.exam_id,
                        subject_id: data.subject_id,
                        total: data.total,
                        score: data.obtained
                    });
                    res.status(200).json({
                        success: 'Result Created Successfully'
                    });
                } catch (error) {
                    res.status(500).json({ error: 'Something went wrong' });
                }
            } else {
                // Update result
                try {
                    await Results.update(
                        {
                            total: data.total,
                            score: data.obtained
                        },
                        {
                            where: {
                                student_id: data.student_id,
                                exam_id: data.exam_id,
                                subject_id: data.subject_id,
                                deletedAt: null
                            },
                        },
                    );
                    res.status(200).json({
                        success: 'Result Updated Successfully'
                    });
                } catch (error) {
                    res.status(500).json({ error: 'Something went wrong' });
                }
            }
            
        } else {
            res.status(400).json({ error: 'Bad Request' });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to add result' });
    }
};

const deleteResult = async (req, res) => {
    const data = req.body;

    if (data.student_id
        && data.exam_id
        && data.subject_id
    ) {
        try {
            await Results.destroy({
                where: {
                    student_id: data.student_id,
                    exam_id: data.exam_id,
                    subject_id: data.subject_id,
                }
            });
            res.status(200).json({
                success: 'Result Deleted Successfully'
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete result' });
        }
    } else {
        res.status(400).json({ error: 'Bad Request' });
    }
};

export default {
    getResultSummary,
    getResultDetails,
    updateOrCreateResult,
    deleteResult
};
