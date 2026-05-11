require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DATABASE_URL,
  DB_USER = 'postgres',
  DB_PASSWORD = '',
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_NAME = 'countries',
} = process.env;

const missingRecommendedVars = ['DB_USER', 'DB_HOST'].filter((key) => !process.env[key]);

if (!DATABASE_URL && missingRecommendedVars.length) {
  console.warn(`Missing database environment variables (${missingRecommendedVars.join(', ')}). Using local defaults; see api/.env.example.`);
}

const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      logging: false,
      native: false,
    })
  : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
      logging: false,
      native: false,
    });
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Country, Activity } = sequelize.models;

Country.belongsToMany(Activity, { through: 'country_activity', timestamps: false });
Activity.belongsToMany(Country, { through: 'country_activity', timestamps: false });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
