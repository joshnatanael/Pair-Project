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
    levelOfDifficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Level of difficulty is required'
        },
        notEmpty: {
          msg: 'Level of difficulty is required'
        }
      }
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Point is required'
        },
        notEmpty: {
          msg: 'Point is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Mission',
  });
  return Mission;
};