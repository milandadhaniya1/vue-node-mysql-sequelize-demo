'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('exams', [
      {
        id: 1,
        title: '2021 Final Exam',
        year: 2021,
        exam_code: '2021_final',
        createdAt: new Date('2024-08-17 09:50:02'),
        updatedAt: new Date('2024-08-17 10:57:07'),
        deletedAt: null
      },
      {
        id: 2,
        title: '2022 Final Exam',
        year: 2022,
        exam_code: '2022_final',
        createdAt: new Date('2024-08-17 09:50:11'),
        updatedAt: new Date('2024-08-17 10:57:07'),
        deletedAt: null
      },
      {
        id: 4,
        title: '2023 Final Exam',
        year: 2023,
        exam_code: '2023_final',
        createdAt: new Date('2024-08-17 09:50:11'),
        updatedAt: new Date('2024-08-17 10:57:07'),
        deletedAt: null
      }
    ], {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('exams', null, {});
  }
};
