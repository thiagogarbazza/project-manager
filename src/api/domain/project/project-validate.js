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
      this.descriptionMustHaveMaximum500Characters(project),
      this.keyMustHaveMaximum20Characters(project),
      this.keyMustBeUnique(project),
      this.nameIsRequired(project),
      this.nameMustHaveMaximum100Characters(project),
      this.colorMustHaveMaximum20Characters(project)
    );
  }

  onUpdate(project) {
    return this.resolveValidationPromises(
      this.descriptionMustHaveMaximum500Characters(project),
      this.keyIsRequired(project),
      this.keyMustHaveMaximum20Characters(project),
      this.keyMustBeUnique(project),
      this.nameIsRequired(project),
      this.nameMustHaveMaximum100Characters(project),
      this.colorMustHaveMaximum20Characters(project)
    );
  }

  descriptionMustHaveMaximum500Characters({description}) {
    if (description && description.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('project.description.maxlength', 'Description must have a maximum of 500 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  keyIsRequired({key}) {
    if (!trim(key)) {
      const businessCase = new BusinessCase('project.key.required', 'Key is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  keyMustHaveMaximum20Characters({key}) {
    if (key && key.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('project.key.maxlength', 'Key must have a maximum of 20 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  keyMustBeUnique({id, key}) {
    const quering = {
      attributes: ['id'],
      where: {key}
    };

    return this.projectModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          const businessCase = new BusinessCase('project.key.unique', 'Key must be unique');
          return Promise.resolve(businessCase);
        }
        return Promise.resolve();
      });
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

  colorMustHaveMaximum20Characters({color}) {
    if (color && color.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('project.color.maxlength', 'Color must have a maximum of 20 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }
}

module.exports = ProjectValidate;
