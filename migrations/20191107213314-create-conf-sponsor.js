'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conf_sponsors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ConferenceId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Conferences',
          key:'id'
        }
      },
      SponsorId: {
        type: Sequelize.INTEGER,
        references: {
          model:'sponsors',
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
    return queryInterface.dropTable('conf_sponsors');
  }
};