'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        login: 'Admin',
        password: '9398637b0aa87a58250dc5065455c9576f9af5ec',
        createdAt: new Date(),
        updatedAt: new Date(),
        role_id: 1
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
