let fs = require("fs");
let winston = require("winston");
let logger = require("../logger");
let env = process.env;

logger.configure({
    level: 'verbose',
    transports: [
      new (winston.transports.Console)()
    ]
  });

module.exports = {
  server: {
    port: 3000,
    ip: '127.0.0.1'
  },

  authentication: {
    passphrase: "MY-PASS-PHRASE-FOR-PROJECT-MANAGER-wd871623746173264716287346",
    options: {session: true}
  },

  database : {
    database: "project-manager",
    username: "",
    password: "",
    options: {
      dialect: "sqlite",
      storage: "project-manager.sqlite",
      logging: (sql) => {
        logger.info(`[${new Date()}] ${sql}`);
      },
      define: {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
      }
    }
  }

  logger.warn('Development configuration file is using');
};
