const { DataTypes } = require('sequelize');
const sequelize = require('./context') 


const contact = sequelize.define('contact', {
    uuid: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
        tableName: 'contact',
        timestamps: false,
        freezeTableName: true
    });
    

  module.exports = contact;