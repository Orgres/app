'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feeder extends Model {
    static associate(models) {
      this.belongsTo(models.Substation, { foreignKey: 'substation_id' })
    }
  };
  Feeder.init({
    name: DataTypes.STRING,
    substation_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Feeder',
  });
  return Feeder;
};
