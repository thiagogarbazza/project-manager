'use strict';

const ProjectService = require('./project-service');
const routeResolver = require('express-route-resolver');
const {KEY_MAXLENGTH} = require('./project-model');

module.exports = app => {
  const projectService = new ProjectService(app);

  app.route('/service/project')
    .get((request, response) => {
      const promise = projectService.find(request.query);

      routeResolver.onFind(response, promise);
    })
    .post((request, response) => {
      const promise = projectService.create(request.body, request.user);

      routeResolver.onCreate(response, promise);
    });

  app.route('/service/project/:key')
    .get((request, response) => {
      const promise = projectService.findByKey(request.params.key);

      routeResolver.onFindOne(response, promise);
    });

  app.route('/service/project/:uuid')
    .get((request, response) => {
      const promise = projectService.findById(request.params.uuid);

      routeResolver.onFindOne(response, promise);
    })
    .put((request, response) => {
      const promise = projectService.update(request.params.uuid, request.body, request.user);

      routeResolver.onUpdate(response, promise);
    })
    .delete((request, response) => {
      const promise = projectService.destroy(request.params.uuid);

      routeResolver.onDelete(response, promise);
    });
};
