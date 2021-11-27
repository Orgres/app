'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meter extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Point, { foreignKey: 'binding' });
    }
  };

  Meter.init({
    number: DataTypes.STRING,
    serial: DataTypes.STRING,
    latlong: DataTypes.STRING,
    type: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    binding: DataTypes.INTEGER,
    seal: DataTypes.STRING,
    verification: DataTypes.DATE,
    phase: DataTypes.STRING,
    transformer_guid: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    indexes: [
      { fields: ['number'] },
      { fields: ['serial'] },
      { fields: ['type'] },
      { fields: ['transformer_guid'] },
    ],
    sequelize,
    modelName: 'Meter',
  });
  return Meter;
};
