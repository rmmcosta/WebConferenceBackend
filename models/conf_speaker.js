'use strict';
module.exports = (sequelize, DataTypes) => {
  const conf_speaker = sequelize.define('conf_speaker', {
    conferenceId: DataTypes.INTEGER,
    speakerId: DataTypes.INTEGER
  }, {});
  conf_speaker.associate = function(models) {
    // associations can be defined here
  };
  return conf_speaker;
};