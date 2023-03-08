// import packages
require('dotenv').config();
const Sequelize = require('sequelize');

// create connection to the database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
      port: 3306,
    }
  );

// export.module
module.exports = sequelize;
