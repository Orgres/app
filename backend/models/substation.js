'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Substation extends Model {
    static associate(models) {
      this.belongsTo(models.Area, { foreignKey: 'area_id' })
    }
  };
  Substation.init({
    name: DataTypes.STRING,
    area_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Substation',
  });
  return Substation;
};
