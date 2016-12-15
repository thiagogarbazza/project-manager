'use strict';

const ProjectService = require('./project-service');
const routeResolver = require('express-route-resolver');

module.exports = app => {
  const projectService = new ProjectService(app);

  app.route('/service/project')
    .get((request, res) => {
      const promise = projectService.find(request.query);

      routeResolver.onFind(res, promise);
    })
    .post((request, res) => {
      const promise = projectService.create(request.body, request.user);

      routeResolver.onCreate(res, promise);
    });

  app.route('/service/project/:uuid')
    .get((request, res) => {
      const promise = projectService.findById(request.params.uuid);

      routeResolver.onFindOne(res, promise);
    })
    .put((request, res) => {
      const promise = projectService.update(request.params.uuid, request.body, request.user);

      routeResolver.onUpdate(res, promise);
    })
    .delete((request, res) => {
      const promise = projectService.destroy(request.params.uuid);

      routeResolver.onDelete(res, promise);
    });
};
