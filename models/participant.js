'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Participant.associate = function(models) {
    // associations can be defined here
  };
  return Participant;
};