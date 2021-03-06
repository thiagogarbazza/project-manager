'use strict';

const SERVER_PORT = 3000;

module.exports = {

  authentication: {
    options: {
      session: false
    },
    passphrase: 'STAR_WARS_6bc69dcf-d567-430d-836e-291a3fae21c0_HARRY_POTTER'
  },

  database: {
    database: 'project_manager',
    options: {
      define: {
        freezeTableName: true,
        schemaDelimiter: '__',
        timestamps: false,
        underscored: false
      },
      dialect: 'sqlite',
      storage: ':memory:'
    },
    password: '',
    username: ''
  },

  logger: {
    colorize: true,
    level: 'warn'
  },

  server: {
    jsonSpaces: 0,
    port: SERVER_PORT,
    syncDatabase: false,
    webDir: 'dist/web'
  }
};
