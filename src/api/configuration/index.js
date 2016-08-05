const env = process.env.NODE_ENV || 'development';
const configuration = require(`./configuration-${env}.js`);

module.exports = configuration;
