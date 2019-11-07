'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('speakers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      filliation: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      speakertypeId: {
        type: Sequelize.INTEGER,
        references: {
          model:'speakertypes',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('speakers');
  }
};