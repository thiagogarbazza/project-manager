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
    port: env.PORT,
    ip: undefined
  },

  authentication: {
    passphrase: "MY-PASS-PHRASE-FOR-PROJECT-MANAGER-wd871623746173264716287346",
    options: {session: true}
  },

  database : {
    database: env.NODE_DATABASE_NAME,
    username: env.NODE_DATABASE_USER,
    password: env.NODE_DATABASE_USER_PASSWORD,
    options: {
      host: env.NODE_DATABASE_HOST
      port: env.NODE_DATABASE_PORT
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: (sql) => {
        //logger.info(`[${new Date()}] ${sql}`);
      },
      define: {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
      }
    }
  }

};
