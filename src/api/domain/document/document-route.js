'use strict';
const documentoService = require('./document-service');
const routeResolve = require('../../modules/route-resolve');

module.exports = app => {
  app
    .route('/service/document')
    .get((req, res) => {
      const promise = documentoService.find(req.query);
      routeResolve.find(res, promise);
    })
    .post((req, res) => {
      const promise = documentoService.create(req.body);
      routeResolve.create(res, promise);
    });

  app
    .route('/service/document/:uuid')
    .get((req, res) => {
      const promise = documentoService.findById(req.params.uuid);
      routeResolve.find(res, promise);
    })
    .put((req, res) => {
      const promise = documentoService.update(req.params.uuid, req.body);
      routeResolve.update(res, promise);
    })
    .delete((req, res) => {
      const promise = documentoService.destroy(req.params.uuid);
      routeResolve.destroy(res, promise);
    });
};
