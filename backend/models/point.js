'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Point.init({
    area: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.STRING,
    account: DataTypes.STRING,
    name: DataTypes.STRING,
    guid: DataTypes.STRING,
    code: {
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    indexes: [
      { unique: true, fields: ['code'] },
      { fields: ['guid'] },
      { fields: ['name'] },
      { fields: ['account'] },
      { fields: ['address'] },
    ],
    sequelize,
    modelName: 'Point',
  });
  return Point;
};
