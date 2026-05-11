const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: {
          msg: 'Country id is required',
        },
        len: {
          args: [3, 3],
          msg: 'Country id must be a 3-letter country code',
        },
        isUppercase: {
          msg: 'Country id must be uppercase',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Country name is required',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Country flag image is required',
        },
      },
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Country continent is required',
        },
      },
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Country capital is required',
        },
      },
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: [0],
          msg: 'Country area must be a positive number',
        },
      },
    },
    population: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Country population must be a positive number',
        },
      },
    }
  });
};
