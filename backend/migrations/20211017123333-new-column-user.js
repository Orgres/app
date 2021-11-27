'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.addColumn('Users', 'middlename', {
            type: Sequelize.STRING,
        });

        await queryInterface.addColumn('Users', 'lastname', {
            type: Sequelize.STRING,
        });
    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.removeColumn('Users', 'middlename', {
            type: Sequelize.INTEGER
        });

        await queryInterface.removeColumn('Users', 'lastname', {
            type: Sequelize.INTEGER
        });
    }
};
