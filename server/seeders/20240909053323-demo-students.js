'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('students', [
      {
        "first_name": "John",
        "last_name": "Doe",
        "phone_no": "1234567890",
        "enrollment_id": 1001,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      },
      {
        "first_name": "Jane",
        "last_name": "Smith",
        "phone_no": "2345678901",
        "enrollment_id": 1002,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      },
      {
        "first_name": "Michael",
        "last_name": "Johnson",
        "phone_no": "3456789012",
        "enrollment_id": 1003,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      },
      {
        "first_name": "Emily",
        "last_name": "Williams",
        "phone_no": "4567890123",
        "enrollment_id": 1004,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      },
      {
        "first_name": "Sarah",
        "last_name": "Brown",
        "phone_no": "5678901234",
        "enrollment_id": 1005,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      },
      {
        "first_name": "David",
        "last_name": "Jones",
        "phone_no": "6789012345",
        "enrollment_id": 1006,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      },
      {
        "first_name": "Laura",
        "last_name": "Garcia",
        "phone_no": "7890123456",
        "enrollment_id": 1007,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      },
      {
        "first_name": "James",
        "last_name": "Martinez",
        "phone_no": "8901234567",
        "enrollment_id": 1008,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      },
      {
        "first_name": "Olivia",
        "last_name": "Hernandez",
        "phone_no": "9012345678",
        "enrollment_id": 1009,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      },
      {
        "first_name": "William",
        "last_name": "Moore",
        "phone_no": "0123456789",
        "enrollment_id": 1010,
        "createdAt": "2024-09-09 00:00:00",
        "updatedAt": "2024-09-09 00:00:00",
        "deletedAt": null
      }
    ]
  , {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('students', null, {});
  }
};
