'use strict';

const env = process.env;

module.exports = {

  authentication: {
    options: {
      session: false
    },
    passphrase: '88f47fbd-11b1-4833-b034-e04021c32286'
  },

  database: {
    database: env.NODE_DATABASE_NAME,
    options: {
      define: {
        freezeTableName: true,
        timestamps: false,
        underscored: false
      },
      dialect: 'postgres',
      dialectOptions: {
        ssl: true
      },
      host: env.NODE_DATABASE_HOST,
      pool: {
        idle: 10000,
        max: 5,
        min: 0
      },
      port: env.NODE_DATABASE_PORT
    },
    password: env.NODE_DATABASE_USER_PASSWORD,
    username: env.NODE_DATABASE_USER
  },

  logger: {
    colorize: true,
    level: 'debug'
  },

  server: {
    jsonSpaces: 0,
    port: env.PORT,
    syncDatabase: false,
    webDir: 'src/web'
  }
};
