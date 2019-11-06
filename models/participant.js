'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Participant.associate = function(models) {
    Participant.belongsToMany(models.Conference,{through:'conf_participant'});
  };
  return Participant;
};