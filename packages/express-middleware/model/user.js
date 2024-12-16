const { DataTypes } = require('sequelize');
const context = require('./context') 


const user = context.define('user', {
    uuid: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  module.exports = user;