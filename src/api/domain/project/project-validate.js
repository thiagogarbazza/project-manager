'use strict';
const {AbstractValidate, BusinessCase} = require('business-error');
const {trim} = require('lodash');

const NAME_MAXLENGTH = 100;

class ProjectValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.projectModel = app.domain.project.ProjectModel;
  }

  onCreate(project) {
    return this.resolveValidationPromises(
      this.nameIsRequired(project),
      this.nameMustHaveMaximum100Characters(project),
      this.nameMustBeUnique(project),
      this.colorMustHaveMaximum20Characters(project)
    );
  }

  onUpdate(project) {
    return this.resolveValidationPromises(
      this.nameIsRequired(project),
      this.nameMustHaveMaximum100Characters(project),
      this.nameMustBeUnique(project),
      this.colorMustHaveMaximum20Characters(project)
    );
  }

  nameIsRequired({name}) {
    if (!trim(name)) {
      const businessCase = new BusinessCase('project.name.required', 'Name is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  nameMustHaveMaximum100Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('project.name.maxlength', 'Name must have a maximum of 100 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  nameMustBeUnique({id, name}) {
    const quering = {
      attributes: ['id'],
      where: {name}
    };

    return this.projectModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          const businessCase = new BusinessCase('project.name.unique', 'Name must be unique');
          return Promise.resolve(businessCase);
        }
        return Promise.resolve();
      });
  }

  colorMustHaveMaximum20Characters({color}) {
    if (color && color.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('project.color.maxlength', 'Color must have a maximum of 20 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }
}

module.exports = ProjectValidate;
