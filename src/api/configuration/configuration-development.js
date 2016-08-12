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
  database: {
    name: 'project-manager',
    options: {
      define: {
        freezeTableName: true,
        timestamps: false,
        underscored: false
      },
      dialect: 'sqlite',
      logging: sql => {
        logger.info(`[${new Date()}] ${sql}`);
      },
      storage: 'target/project-manager.sqlite'
    },
    password: '',
    synchronize: true,
    username: ''
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
