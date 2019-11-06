'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conf_participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ConferenceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Conferences',
          key: 'id'
        }
      },
      ParticipantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Participants',
          key: 'id'
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
    return queryInterface.dropTable('conf_participants');
  }
};