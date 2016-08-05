const fs = require('fs');
const winston = require('winston');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({
      colorize: false,
      filename: 'logs/app.log',
      level: 'info',
      maxFiles: 10,
      maxsize: 1048576
    })
  ]
});
