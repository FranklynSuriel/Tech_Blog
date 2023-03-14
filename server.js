// import packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const Config = require('./config/connections');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const hbs = exphbs.create({ helpers });
const PORT = process.env.PORT || 3001;

app.use(session(Config.expressSessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

Config.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
