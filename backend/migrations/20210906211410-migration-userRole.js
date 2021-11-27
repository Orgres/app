'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role_id', {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      onDelete: 'cascade',
      references: {
        model: 'Roles',
        key: 'id',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role_id', {
      type: Sequelize.INTEGER
    })
  }
};
