'use strict';
const dottie = require('dottie');
const glob = require('glob');
const logger = require('../logger.js');
const path = require('path');
const yaml = require('yamljs');

const DATABASE_FILES_PATTERN = path.join(__dirname, '../../api-db/**/*.yml');
const GLOB_SETTINGS = {
  realpath: true
};

module.exports = app => {
  const databaseFiles = glob.sync(DATABASE_FILES_PATTERN, GLOB_SETTINGS);
  return readFile(databaseFiles);

  function readFile(files) {
    if (files.length === 0) {
      return Promise.resolve();
    }

    const file = files.shift();
    logger.info('carregando arquivo database:', file);
    const fileData = yaml.load(file);
    return readModel(fileData).then(() => readFile(files));
  }

  function readModel(models) {
    if (models.length === 0) {
      return Promise.resolve();
    }

    const item = models.shift();
    logger.info('## model:', item.model);
    const Model = dottie.get(app.domain, item.model);
    return Model.bulkCreate(item.data).then(() => readModel(models));
  }
};
