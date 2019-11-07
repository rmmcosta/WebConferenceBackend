'use strict';
module.exports = (sequelize, DataTypes) => {
  const conf_sponsor = sequelize.define('conf_sponsor', {
    ConferenceId: DataTypes.INTEGER,
    SponsorId: DataTypes.INTEGER
  }, {});
  conf_sponsor.associate = function(models) {
    // associations can be defined here
  };
  return conf_sponsor;
};