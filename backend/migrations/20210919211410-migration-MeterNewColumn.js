'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const transaction = await queryInterface.sequelize.transaction();

      await queryInterface.addColumn('Meters', 'transformer_guid', {
        type: Sequelize.STRING,
      }, { transaction });

      await queryInterface.addIndex('Meters',
        ['transformer_guid'],
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
      await queryInterface.removeColumn('Meters', 'transformer_guid', {
        type: Sequelize.INTEGER
      });

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }

  }
};
