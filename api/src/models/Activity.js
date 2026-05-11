const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Activity name is required',
        },
      },
    },
    difficulty: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['1', '2', '3', '4', '5']],
          msg: 'Activity difficulty must be between 1 and 5',
        },
      },
    },
    duration: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']],
          msg: 'Activity duration must be between 1 and 24 hours',
        },
      },
    },
    season: {
      type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Activity season is required',
        },
        isIn: {
          args: [['Summer', 'Autumn', 'Winter', 'Spring']],
          msg: 'Activity season must be Summer, Autumn, Winter or Spring',
        },
      },
    }
  });
};
