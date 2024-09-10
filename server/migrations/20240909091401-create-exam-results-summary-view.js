'use strict';

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE VIEW IF NOT EXISTS exam_results_summary AS
      SELECT fr.exam_id AS exam_id,
             fr.exam_code AS exam_code,
             fr.exam_title AS exam_title,
             fr.student_id AS student_id,
             fr.student_enrollment_id AS student_enrollment_id,
             fr.student_name AS student_name,
             fr.total AS total,
             fr.score AS score,
             fr.percentage AS percentage,
             g.grade AS grade
      FROM (SELECT br.exam_id AS exam_id,
                   br.exam_code AS exam_code,
                   br.exam_title AS exam_title,
                   st.id AS student_id,
                   st.enrollment_id AS student_enrollment_id,
                   CONCAT(st.first_name, ' ', st.last_name) AS student_name,
                   br.total AS total,
                   br.score AS score,
                   ROUND(br.score * 100 / br.total, 2) AS percentage
            FROM (SELECT r.student_id AS student_id,
                         e.id AS exam_id,
                         e.exam_code AS exam_code,
                         e.title AS exam_title,
                         SUM(r.total) AS total,
                         SUM(r.score) AS score
                  FROM results r
                  LEFT JOIN exams e ON r.exam_id = e.id
                  WHERE r.deletedAt IS NULL
                  GROUP BY r.exam_id, r.student_id) br
            LEFT JOIN students st ON st.id = br.student_id) fr
      LEFT JOIN grade g ON fr.percentage >= g.min AND fr.percentage < g.max
      ORDER BY fr.exam_code, fr.student_id;
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS exam_results_summary;');
  }
};
