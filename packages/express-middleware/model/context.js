const { Sequelize } = require('sequelize');


//instance pr se connecter à une base de données SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH
  });


module.exports = sequelize;