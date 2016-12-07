'use strict';
const {camelCase} = require('lodash');
const dottie = require('dottie');
const glob = require('glob');
const winston = require('winston');
const path = require('path');

const ROOT_PATH = path.join(__dirname, '../domain/');
const MODEL_FILES = path.join(ROOT_PATH, '**/*-model.js');
const GLOB_SETTINGS = {realpath: true};

module.exports = app => {
  if (!app.domain) {
    app.domain = {};
    const sequelize = app.sequelize;

    glob.sync(MODEL_FILES, GLOB_SETTINGS)
      .forEach(modelFile => {
        const Model = sequelize.import(modelFile);

        const packagePath = extractPackagePath(modelFile);
        const modelPath = `${packagePath}.${Model.name}`;
        dottie.set(app.domain, modelPath, Model);

        winston.info('Loading the model:', modelPath);
      });

    runAssociates(app.domain, app.domain);
  }
};

function extractPackagePath(modelFileName) {
  return modelFileName
    .replace(ROOT_PATH, '')
    .split(path.sep)
    .filter(step => !step.endsWith('-model.js'))
    .map(step => camelCase(step))
    .toString()
    .replace(',', '.');
}

function runAssociates(root, domain) {
  Object.keys(root)
    .forEach(key => {
      const current = root[key];

      if (current && current.tableName && current.associate) {
        current.associate(domain);
      } else if (current && !current.tableName) {
        runAssociates(current, domain);
      }
    });
}
