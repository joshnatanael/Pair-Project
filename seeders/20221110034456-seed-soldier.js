'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Soldiers', [{
      fullName: 'Major ABCD',
      age: 40,
      gender: "Male",
      profilePictureUrl: "https://cdn-icons-png.flaticon.com/512/3939/3939528.png",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Soldiers', null, {});s
  }
};
