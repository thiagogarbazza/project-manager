'use strict';

const ClientService = require('./client-service');
const routeResolver = require('express-route-resolver');

module.exports = app => {
  const clientService = new ClientService(app);

  app.route('/service/client')
    .get((req, res) => {
      const promise = clientService.find(req.query);
      routeResolver.onFind(res, promise);
    })
    .post((req, res) => {
      const promise = clientService.create(req.body, req.user);
      routeResolver.onCreate(res, promise);
    });

  app.route('/service/client/:uuid')
    .get((req, res) => {
      const promise = clientService.findById(req.params.uuid);
      routeResolver.onFindOne(res, promise);
    })
    .put((req, res) => {
      const promise = clientService.update(req.params.uuid, req.body, req.user);
      routeResolver.onUpdate(res, promise);
    })
    .delete((req, res) => {
      const promise = clientService.destroy(req.params.uuid);
      routeResolver.onDelete(res, promise);
    });
};
