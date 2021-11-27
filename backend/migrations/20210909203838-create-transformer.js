'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transformers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guid: {
        type: Sequelize.STRING
      },
      feeder_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'Feeders',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transformers');
  }
};
