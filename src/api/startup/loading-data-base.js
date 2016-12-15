'use strict';

const dottie = require('dottie');
const glob = require('glob');
const winston = require('winston');
const path = require('path');
const yaml = require('yamljs');

const DATABASE_FILES_PATTERN = path.join(__dirname, '../../api-db/**/*.yml');
const GLOB_SETTINGS = {realpath: true};

module.exports = app => {
  const DATABASE_FILES = glob.sync(DATABASE_FILES_PATTERN, GLOB_SETTINGS);

  return readFile(DATABASE_FILES);

  function readFile(files) {
    if (files.length === 0) {
      return Promise.resolve();
    }

    const file = files.shift();

    winston.debug('loading database file:', file);
    const fileData = yaml.load(file);

    return readModel(fileData).then(() => readFile(files));
  }

  function readModel(models) {
    if (models.length === 0) {
      return Promise.resolve();
    }

    const item = models.shift();

    winston.debug('## model:', item.model);
    const Model = dottie.get(app.domain, item.model);

    return Model.bulkCreate(item.data).then(() => readModel(models));
  }
};
