'use strict';
const UserService = require('./user-service');
const routeResolver = require('express-route-resolver');

module.exports = app => {
  const userService = new UserService(app);

  app.route('/service/user')
    .get((req, res) => {
      const promise = userService.find(req.query);
      routeResolver.onFind(res, promise);
    })
    .post((req, res) => {
      const promise = userService.create(req.body);
      routeResolver.onCreate(res, promise);
    });

  app.route('/service/user/:uuid')
    .get((req, res) => {
      const promise = userService.findById(req.params.uuid);
      routeResolver.onFindOne(res, promise);
    })
    .put((req, res) => {
      const promise = userService.update(req.params.uuid, req.body);
      routeResolver.onUpdate(res, promise);
    })
};
