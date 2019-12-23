'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'admin',
      lastName: 'admin',
      username: 'admin',
      type: 'systemadmin',
      email: 'admin@mail.com',
      password: '$2a$08$Kj.QDGRE9cE3EBoeL1dIo.KGp7LISJfhmRO40sVbrhLpcnphrixhi',
      about: 'the administrator',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
