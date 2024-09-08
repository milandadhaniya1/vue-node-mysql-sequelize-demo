import sequelize from './../plugins/database.mjs';

// Raw SQL to create a view
const createResultsSummaryViewQuery = `
    CREATE VIEW IF NOT EXISTS exam_results_summary AS
    select 
    fr.exam_id AS exam_id, 
    fr.exam_code AS exam_code, 
    fr.exam_title AS exam_title, 
    fr.student_id AS student_id, 
    fr.student_enrollment_id AS student_enrollment_id, 
    fr.student_name AS student_name, 
    fr.total AS total, 
    fr.score AS score, 
    fr.percentage AS percentage, 
    g.grade AS grade 
    from 
    (
        (
        select 
            br.exam_id AS exam_id, 
            br.exam_code AS exam_code, 
            br.exam_title AS exam_title, 
            st.id AS student_id, 
            st.enrollment_id AS student_enrollment_id, 
            concat(
            st.first_name, ' ', st.last_name
            ) AS student_name, 
            br.total AS total, 
            br.score AS score, 
            round(
            br.score * 100 / br.total, 2
            ) AS percentage 
        from 
            (
            (
                select 
                r.student_id AS student_id, 
                e.id AS exam_id, 
                e.exam_code AS exam_code, 
                e.title AS exam_title, 
                sum(r.total) AS total, 
                sum(r.score) AS score 
                from 
                (
                    results r 
                    left join exams e on(r.exam_id = e.id)
                ) 
                where 
                r.deletedAt is null 
                group by 
                r.exam_id, 
                r.student_id
            ) br 
            left join students st on(st.id = br.student_id)
            )
        ) fr         left join grade g on(
        fr.percentage >= g.min 
        and fr.percentage < g.max
        )
    ) 
    order by 
    fr.exam_code, 
    fr.student_id`;

// Function to create the view
const ResultsSummaryView = async () => {
    try {
        await sequelize.query(createResultsSummaryViewQuery);
    } catch (error) {
        console.error("Error creating view:", error);
    }
};

export default ResultsSummaryView;
