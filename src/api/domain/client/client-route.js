'use strict';

const ClientService = require('./client-service');
const routeResolver = require('express-route-resolver');

module.exports = app => {
  const clientService = new ClientService(app);

  app.route('/service/client')
    .get((request, response) => {
      const promise = clientService.find(request.query);

      routeResolver.onFind(response, promise);
    })
    .post((request, response) => {
      const promise = clientService.create(request.body, request.user);

      routeResolver.onCreate(response, promise);
    });

  app.route('/service/client/:uuid')
    .get((request, response) => {
      const promise = clientService.findById(request.params.uuid);

      routeResolver.onFindOne(response, promise);
    })
    .put((request, response) => {
      const promise = clientService.update(request.params.uuid, request.body, request.user);

      routeResolver.onUpdate(response, promise);
    })
    .delete((request, response) => {
      const promise = clientService.destroy(request.params.uuid);

      routeResolver.onDelete(response, promise);
    });
};
