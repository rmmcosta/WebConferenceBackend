'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sponsors', [{
      name: 'Noesis',
      logo: '',
      category: 'IT Consulting',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sponsors', null, {});
  }
};
