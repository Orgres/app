'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Role, { foreignKey: 'role_id' })
    }
  };
  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    lastname: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
