'use strict';
module.exports = (sequelize, DataTypes) => {
  const sponsor = sequelize.define('sponsor', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  sponsor.associate = function(models) {
    sponsor.belongsToMany(models.Conference,{through:'conf_sponsor'});
  };
  return sponsor;
};