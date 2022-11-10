'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'major1',
      email: 'major1@example.com',
      password: "123",
      role: "soldier",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
