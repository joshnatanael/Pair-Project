'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Missions', 'status', { type: Sequelize.BOOLEAN});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Missions', 'status');
  }
};
