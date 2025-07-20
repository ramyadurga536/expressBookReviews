// db/sequelize.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log("Connecting to database with URL:", process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
