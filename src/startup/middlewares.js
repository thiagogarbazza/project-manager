let bodyParser = require('body-parser');
let express = require('express');
let morgan = require('morgan');
let cors = require('cors');
let compression = require('compression');
let helmet = require('helmet');
let logger = require('../logger.js');

module.exports = app => {
  app.set("json spaces", 4);

  app.use(morgan("common", {
    stream: {
      write: (message) => {
        logger.info(message);
      }
    }
  }));

  app.use(helmet());

  app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

  app.use(compression());
  app.use(bodyParser.json());
  //app.use(app.authentication.initialize());

  app.use(express.static("public"));

  // Alterando as rotas.
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
};
