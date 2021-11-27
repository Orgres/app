'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transformer extends Model {
    static associate(models) {
      this.belongsTo(models.Feeder, { foreignKey: 'feeder_id' })
    }
  };
  Transformer.init({
    guid: DataTypes.STRING,
    feeder_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transformer',
  });
  return Transformer;
};
