'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const transaction = await queryInterface.sequelize.transaction();

      await queryInterface.addColumn('Meters', 'binding', {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        onDelete: 'cascade',
        references: {
          model: 'Points',
          key: 'id',
        },
      }, { transaction });

      await queryInterface.addColumn('Meters', 'seal', {
        type: Sequelize.STRING,
      }, { transaction });

      await queryInterface.addColumn('Meters', 'phase', {
        type: Sequelize.STRING,
      }, { transaction });

      await queryInterface.addColumn('Meters', 'verification', {
        type: Sequelize.DATE,
      }, { transaction });

      await queryInterface.addColumn('Meters', 'note', {
        type: Sequelize.TEXT,
      }, { transaction });

      await queryInterface.addIndex('Meters',
        ['number', 'serial', 'type'],
        { transaction });

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {

    try {
      await queryInterface.removeColumn('Meters', 'binding', {
        type: Sequelize.INTEGER
      });

      await queryInterface.removeColumn('Meters', 'seal', {
        type: Sequelize.STRING,
      }, { transaction });

      await queryInterface.removeColumn('Meters', 'phase', {
        type: Sequelize.STRING,
      }, { transaction });

      await queryInterface.removeColumn('Meters', 'verification', {
        type: Sequelize.DATE,
      }, { transaction });

      await queryInterface.removeColumn('Meters', 'note', {
        type: Sequelize.TEXT,
      }, { transaction });

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }

  }
};
