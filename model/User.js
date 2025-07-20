// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
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

module.exports = User;
