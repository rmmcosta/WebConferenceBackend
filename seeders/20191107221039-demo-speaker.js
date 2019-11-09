'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('speakers', [{
      name: 'Paulo Rosado',
      filliation: 'OutSystems',
      bio: 'OutSystems CEO',
      foto: '',
      link: 'https://www.google.com',
      speakertypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('speakers', null, {});
  }
};
