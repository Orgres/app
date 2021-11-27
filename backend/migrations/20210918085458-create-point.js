'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {
      const transaction = await queryInterface.sequelize.transaction();

      await queryInterface.createTable('Points', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        area: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        type: {
          type: Sequelize.STRING
        },
        account: {
          type: Sequelize.STRING
        },
        name: {
          type: Sequelize.STRING
        },
        guid: {
          type: Sequelize.STRING
        },
        code: {
          type: Sequelize.STRING,
          unique: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction });
      await queryInterface.addIndex('Points',
        ['code', 'guid', 'name', 'account', 'address', 'area'],
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
      const transaction = await queryInterface.sequelize.transaction();
      await queryInterface.dropTable('Points', { transaction });
      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
