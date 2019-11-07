'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conf_speakers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conferenceId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Conferences',
          key:'id'
        }
      },
      speakerId: {
        type: Sequelize.INTEGER,
        references: {
          model:'speakers',
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
    return queryInterface.dropTable('conf_speakers');
  }
};