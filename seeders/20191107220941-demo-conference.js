'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Conferences', [{
      acronym: 'OSNS',
      name: 'OutSystems NextStep',
      description: 'The big OutSystems conference where the new Platform features are presented',
      address: 'Amsterdam',
      when: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Conferences', null, {});
  }
};
