'use strict';
module.exports = (sequelize, DataTypes) => {
  const speaker = sequelize.define('speaker', {
    name: DataTypes.STRING,
    filliation: DataTypes.STRING,
    bio: DataTypes.STRING,
    foto: DataTypes.STRING,
    link: DataTypes.STRING,
    speakertypeId: DataTypes.INTEGER
  }, {});
  speaker.associate = function(models) {
    speaker.belongsTo(models.speakertype);
    speaker.belongsToMany(models.Conferece,{through:'conf_speaker'});
  };
  return speaker;
};