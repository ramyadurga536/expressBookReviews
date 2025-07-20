// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Book = sequelize.define('books', {
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reviews: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at' 
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  timestamps: true    
}); 

module.exports = Book;
