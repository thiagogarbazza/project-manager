module.exports = app => {
  const env = process.env.NODE_ENV || 'development';
  app.configuration = require(`./startup/configuration-${env}.js`);
};
