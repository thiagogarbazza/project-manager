'use strict';

const DocumentService = require('./document-service');
const routeResolver = require('express-route-resolver');

module.exports = app => {
  const documentService = new DocumentService(app);

  app.route('/service/document')
    .get((req, res) => {
      const promise = documentService.find(req.query);
      routeResolver.onFind(res, promise);
    })
    .post((req, res) => {
      const promise = documentService.create(req.body, req.user);
      routeResolver.onCreate(res, promise);
    });

  app.route('/service/document/:uuid')
    .get((req, res) => {
      const promise = documentService.findById(req.params.uuid);
      routeResolver.onFindOne(res, promise);
    })
    .put((req, res) => {
      const promise = documentService.update(req.params.uuid, req.body, req.user);
      routeResolver.onUpdate(res, promise);
    })
    .delete((req, res) => {
      const promise = documentService.destroy(req.params.uuid);
      routeResolver.onDelete(res, promise);
    });
};
