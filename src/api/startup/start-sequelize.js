const configuration = require('../configuration');
const Sequelize = require('sequelize');

module.exports = app => {
  if (!app.sequelize) {
    app.sequelize = new Sequelize(
      configuration.database.name,
      configuration.database.username,
      configuration.database.password,
      configuration.database.options
    );
  }

  return app.sequelize;
};
