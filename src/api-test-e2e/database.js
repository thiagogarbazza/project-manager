'use strict';

const loadingDataBase = require('../api/startup/loading-data-base');

global.dataBase = dataBase(app);

function dataBase(app) {
  let isDBSync = false;
  let models = [];

  return {init};

  function init(done) {
    return dataBaseSync()
      .then(() => cleanAllDataBase())
      .then(() => loadingDataBase(app))
      .then(done);
  }

  function dataBaseSync() {
    if (isDBSync) return Promise.resolve();
    isDBSync = true;

    return app.sequelize.sync();
  }

  function cleanAllDataBase() {
    models = models.length > 0 ? models : getModels();
    const promiseDestroy = models.map(model => model.destroy({where: {}}));

    return Promise.all(promiseDestroy);
  }

  function getModels() {
    const MODELS = [
      app.domain.security.user.UserModel
    ];

    return MODELS;
  }
}
