'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('subjects', [
      {
        id: 1,
        name: 'English',
        createdAt: new Date('2024-08-14 09:06:02'),
        updatedAt: new Date('2024-08-14 09:07:40'),
        deletedAt: null
      },
      {
        id: 2,
        name: 'Mathematics',
        createdAt: new Date('2024-08-14 09:07:18'),
        updatedAt: new Date('2024-08-14 09:07:18'),
        deletedAt: null
      },
      {
        id: 3,
        name: 'Hindi',
        createdAt: new Date('2024-08-14 09:08:29'),
        updatedAt: new Date('2024-08-14 09:08:29'),
        deletedAt: null
      },
      {
        id: 4,
        name: 'Science and Technology',
        createdAt: new Date('2024-08-14 09:09:54'),
        updatedAt: new Date('2024-08-14 09:09:54'),
        deletedAt: null
      },
      {
        id: 5,
        name: 'Social Science',
        createdAt: new Date('2024-08-14 09:11:18'),
        updatedAt: new Date('2024-09-05T09:50:49Z'),
        deletedAt: null
      },
      {
        id: 6,
        name: 'Painting',
        createdAt: new Date('2024-08-14 09:11:57'),
        updatedAt: new Date('2024-08-14 09:11:57'),
        deletedAt: null
      }
    ], {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
