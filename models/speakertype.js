'use strict';
module.exports = (sequelize, DataTypes) => {
  const speakertype = sequelize.define('speakertype', {
    description: DataTypes.STRING
  }, {});
  speakertype.associate = function(models) {
    //
  };
  return speakertype;
};