'use strict';
const {endsWith} = require('lodash');
const loadingDataBase = require('../api/startup/loading-data-base');

global.dataBase = dataBase(app);

function dataBase(app) {
  let isDBSync = false;
  let models = [];
  return {
    init
  };

  function init(done) {
    dataBaseSync()
      .then(() => cleanAllDataBase(app))
      .then(() => loadingDataBase(app))
      .then(done);
  }

  function dataBaseSync() {
    if (isDBSync) return Promise.resolve();
    isDBSync = true;
    return app.sequelize.sync();
  }

  function cleanAllDataBase(app) {
    models = models.length > 0 ? models : getModels(app.domain);
    const promiseDestroy = models.map(model => model.destroy({
      where: {}
    }));

    return Promise.all(promiseDestroy);
  }

  function getModels(domain) {
    let models = [];

    Object.keys(domain).forEach(key => {
      const value = domain[key];
      if (endsWith(key, 'Model')) {
        models.push(value);
      } else {
        models = models.concat(getModels(value));
      }
    });

    return models;
  }
}
