const logger = require('../logger');
const winston = require('winston');

const PORT = 3000;

module.exports = {
  authentication: {
    options: {
      session: true
    },
    passphrase: 'MY-PASS-PHRASE-FOR-PROJECT-MANAGER-wd871623746173264716287346'
  },
  dataBase: {
    synchronize: true
  },
  name: 'development',
  server: {
    apiPort: PORT,
    publicFolder: 'src/web/'
  }
};


logger.configure({
  level: 'verbose',
  transports: [
    new winston.transports.Console()
  ]
});
