'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('grade', {
      id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      min: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      max: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      grade: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.addIndex('grade', ['min']);
    await queryInterface.addIndex('grade', ['max']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('grade');
  }
};
