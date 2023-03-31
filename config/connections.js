// import packages
require('dotenv').config();
const Sequelize = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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

const expressSessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    expires: new Date(Date.now() + 300000), // session expires after 5 minutes idle
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// export.module
module.exports = {
  sequelize,
  expressSessionConfig,
};
