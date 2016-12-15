'use strict';

const DocumentService = require('./document-service');
const routeResolver = require('express-route-resolver');

module.exports = app => {
  const documentService = new DocumentService(app);

  app.route('/service/document')
    .get((request, response) => {
      const promise = documentService.find(request.query);

      routeResolver.onFind(response, promise);
    })
    .post((request, response) => {
      const promise = documentService.create(request.body, request.user);

      routeResolver.onCreate(response, promise);
    });

  app.route('/service/document/:uuid')
    .get((request, response) => {
      const promise = documentService.findById(request.params.uuid);

      routeResolver.onFindOne(response, promise);
    })
    .put((request, response) => {
      const promise = documentService.update(request.params.uuid, request.body, request.user);

      routeResolver.onUpdate(response, promise);
    })
    .delete((request, response) => {
      const promise = documentService.destroy(request.params.uuid);

      routeResolver.onDelete(response, promise);
    });
};
