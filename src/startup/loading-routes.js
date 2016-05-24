let path = require("path");
let glob = require("glob");
let logger = require("../logger");
let array = require('lodash/array');

module.exports = app => {

  const modelFiles = path.join(__dirname, "../domain/**/*-route.js");
  glob.sync(modelFiles, {}).forEach((modelFile, index) => {
    logger.info('Loading the route:', array.last(modelFile.split('/')));
    require(modelFile)(app);
  });
};
