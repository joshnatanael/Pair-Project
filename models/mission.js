'use strict';
const capitalizeWords = require('../helpers/formattingNameMission');
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
    formattingName(){
      return capitalizeWords(this.name)
    }
  }
  Mission.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Mission name is required'
        },
        notEmpty: {
          msg: 'Mission name is required'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Location is required'
        },
        notEmpty: {
          msg: 'Location is required'
        }
      }
    },
    levelOfDifficulty: DataTypes.STRING,
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Point is required'
        },
        notEmpty: {
          msg: 'Point is required'
        },
        min: {
          args: 100,
          msg: `Minimum Point is 100`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    status: DataTypes.BOOLEAN 
  }, {
    sequelize,
    modelName: 'Mission',
  });
  Mission.beforeUpdate((mission, options) => {
    console.log('masuk update')
    if(mission.point >= 10000){
      mission.levelOfDifficulty = 'High'
    } else if(mission.point >= 5000){
      mission.levelOfDifficulty = 'Medium'
    } else if(mission.point >= 100){
      mission.levelOfDifficulty = 'Easy'
    }
  });
  Mission.beforeCreate((mission, options) => {
    if(mission.point >= 10000){
      mission.levelOfDifficulty = 'High'
    } else if(mission.point >= 5000){
      mission.levelOfDifficulty = 'Medium'
    } else if(mission.point >= 100){
      mission.levelOfDifficulty = 'Easy'
    }
  });
  return Mission;
};