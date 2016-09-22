const express = require('express');
const startup = require('./startup');

const app = express();
startup.start(app);

module.exports = app;
