const Sequelize = require("sequelize");

module.exports = app => {
  if (!app.sequelize) {
    const configuration = app.configuration.database;
    app.sequelize = new Sequelize(
      configuration.database,
      configuration.username,
      configuration.password,
      configuration.options
    );
  }
};
