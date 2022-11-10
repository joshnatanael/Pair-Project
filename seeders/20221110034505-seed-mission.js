'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Missions', [{
      name: 'Defend The Border',
      location: "Ukraine",
      levelOfDifficulty: "Medium",
      point: 5000,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Missions', null, {});
  }
};
