'use strict';
module.exports = (sequelize, DataTypes) => {
  const conf_participant = sequelize.define('conf_participant', {
    ConferenceId: DataTypes.INTEGER,
    ParticipantId: DataTypes.INTEGER
  }, {});
  conf_participant.associate = function(models) {
    //
  };
  return conf_participant;
};