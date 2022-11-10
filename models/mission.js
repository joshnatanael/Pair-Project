'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mission.belongsTo(models.User);
    }
  }
  Mission.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    levelOfDifficulty: DataTypes.STRING,
    point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mission',
  });
  return Mission;
};