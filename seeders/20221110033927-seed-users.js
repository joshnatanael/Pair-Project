'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'major',
      email: 'major1@example.com',
      password: "123",
      role: "Soldier",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
