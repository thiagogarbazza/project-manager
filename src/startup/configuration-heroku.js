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
    port: env.NODE_PORT,
    ip: env.NODE_IP
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

};
