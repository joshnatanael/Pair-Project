'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Soldier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Soldier.belongsTo(models.User);
    }
    static showAllProfileUser(){
      let options = { 
        include: { 
          all: true, nested: true 
        }
      }
      return Soldier.findAll(options)
    }
  }
  Soldier.init({
    fullName: {
      type :DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    age: {
      type :DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Age is required'
        },
        notEmpty: {
          msg: 'Age is required'
        },
        min:{
          args:[19],
          msg: "Must be older than 19 years old"
        }
      }
    },
    gender: {
      type :DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gender is required'
        },
        notEmpty: {
          msg: 'Gender is required'
        }
      }
    },
    profilePictureUrl: {
      type :DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Profile Picture URL is required'
        },
        notEmpty: {
          msg: 'Profile Picture URL is required'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Soldier',
  });
  return Soldier;
};