'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('grade', [
      {
        id: 1,
        min: 0,
        max: 35,
        grade: 'F',
        createdAt: new Date('2024-08-17 09:34:34'),
        updatedAt: new Date('2024-08-17 10:51:54'),
        deletedAt: null
      },
      {
        id: 2,
        min: 35,
        max: 45,
        grade: 'E',
        createdAt: new Date('2024-08-17 09:35:00'),
        updatedAt: new Date('2024-08-17 09:35:20'),
        deletedAt: null
      },
      {
        id: 3,
        min: 45,
        max: 55,
        grade: 'D',
        createdAt: new Date('2024-08-17 09:35:51'),
        updatedAt: new Date('2024-08-17 10:51:54'),
        deletedAt: null
      },
      {
        id: 4,
        min: 55,
        max: 65,
        grade: 'C',
        createdAt: new Date('2024-08-17 09:36:22'),
        updatedAt: new Date('2024-08-17 10:51:54'),
        deletedAt: null
      },
      {
        id: 5,
        min: 66,
        max: 80,
        grade: 'B',
        createdAt: new Date('2024-08-17 09:36:58'),
        updatedAt: new Date('2024-08-17 09:36:58'),
        deletedAt: null
      },
      {
        id: 6,
        min: 80,
        max: 100,
        grade: 'A',
        createdAt: new Date('2024-08-17 09:37:08'),
        updatedAt: new Date('2024-08-17 10:51:54'),
        deletedAt: null
      }
    ] , {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('grade', null, {});
  }
};
