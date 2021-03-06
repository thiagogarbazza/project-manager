'use strict';

const JSON_SPACES = 2;
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
    level: 'debug'
  },

  server: {
    jsonSpaces: JSON_SPACES,
    port: SERVER_PORT,
    syncDatabase: true,
    webDir: ['src/web', 'dist/web']
  }
};
