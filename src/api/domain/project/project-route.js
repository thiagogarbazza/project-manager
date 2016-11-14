'use strict';
const ProjectService = require('./project-service');
const routeResolver = require('express-route-resolver');

module.exports = app => {
  const projectService = new ProjectService(app);

  app.route('/service/project')
    .get((req, res) => {
      const promise = projectService.find(req.query);
      routeResolver.onFind(res, promise);
    })
    .post((req, res) => {
      const promise = projectService.create(req.body, req.user);
      routeResolver.onCreate(res, promise);
    });

  app.route('/service/project/:uuid')
    .get((req, res) => {
      const promise = projectService.findById(req.params.uuid);
      routeResolver.onFindOne(res, promise);
    })
    .put((req, res) => {
      const promise = projectService.update(req.params.uuid, req.body, req.user);
      routeResolver.onUpdate(res, promise);
    })
    .delete((req, res) => {
      const promise = projectService.destroy(req.params.uuid);
      routeResolver.onDelete(res, promise);
    });
};
