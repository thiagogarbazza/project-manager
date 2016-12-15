'use strict';

const UserService = require('./user-service');
const routeResolver = require('express-route-resolver');

module.exports = app => {
  const userService = new UserService(app);

  app.route('/service/user')
    .get((request, response) => {
      const promise = userService.find(request.query);

      routeResolver.onFind(response, promise);
    })
    .post((request, response) => {
      const promise = userService.create(request.body);

      routeResolver.onCreate(response, promise);
    });

  app.route('/service/user/:uuid')
    .get((request, response) => {
      const promise = userService.findById(request.params.uuid);

      routeResolver.onFindOne(response, promise);
    })
    .put((request, response) => {
      const promise = userService.update(request.params.uuid, request.body);

      routeResolver.onUpdate(response, promise);
    });
};
