'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conference = sequelize.define('Conference', {
    acronym: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    when: Date
  }, {});
  Conference.associate = function(models) {
    Conference.belongsToMany(models.Participant,{through:'conf_participant'});
    Conference.belongsToMany(models.sponsor,{through:'conf_sponsor'});
    Conference.belongsToMany(models.speaker,{through:'conf_speaker'});
  };
  return Conference;
};