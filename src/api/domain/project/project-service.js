'use strict';

const AbstractDomainService = require('../abstract-domain-service');
const ProjectValidate = require('./project-validate');

class ProjectService extends AbstractDomainService {
  constructor(app) {
    super(app);
    this.clientModel = app.domain.client.ClientModel;
    this.projectModel = app.domain.project.ProjectModel;
    this.projectValidate = new ProjectValidate(app);
    this.userModel = app.domain.security.user.UserModel;
  }

  create(project, user) {
    return this.fillCreatedBy(project, user)
      .then(() => this.projectValidate.onCreate(project))
      .then(() => this.projectModel.create(project));
  }

  destroy(id) {
    const quering = {where: {id}};

    return this.projectModel.destroy(quering);
  }

  find(filter) {
    const quering = {
      attributes: ['id', 'name', 'color', 'active'],
      order: 'name ASC',
      where: {}
    };

    if (filter.name) {
      quering.where.name = {like: `%${filter.name}%`};
    }

    return this.projectModel.findAll(quering);
  }

  findById(id) {
    const quering = {
      include: [{
        as: 'client',
        attributes: ['id', 'name', 'color', 'active'],
        model: this.clientModel
      }, {
        as: 'creationByUser',
        attributes: ['id', 'name', 'email', 'avatar'],
        model: this.userModel
      }, {
        as: 'updatedByUser',
        attributes: ['id', 'name', 'email', 'avatar'],
        model: this.userModel
      }]
    };

    return this.projectModel.findById(id, quering);
  }

  update(id, project, user) {
    const quering = {where: {id}};

    return this.fillUpdatedBy(project, user)
      .then(() => this.projectValidate.onUpdate(project))
      .then(() => this.projectModel.update(project, quering));
  }
}

module.exports = ProjectService;
