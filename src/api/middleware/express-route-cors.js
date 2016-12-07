'use strict';

const cors = require('cors');

module.exports = app => {
  app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: ['http://localhost:3000']
  }));
};
