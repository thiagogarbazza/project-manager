'use strict';

const {AbstractValidate, BusinessCase} = require('business-error');
const {trim} = require('lodash');

const COLOR_MAXLENGTH = 20;
const ICON_MAXLENGTH = 20;
const NAME_MAXLENGTH = 50;

class WorkItemSeverityValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.workItemSeverityModel = app.domain.workItem.severity.WorkItemSeverityModel;
  }

  onCreate(project) {
    return this.resolveValidationPromises(
      this.colorMustHaveMaximum20Characters(project),
      this.descriptionMustHaveMaximum500Characters(project),
      this.iconMustHaveMaximum20Characters(project),
      this.nameIsRequired(project),
      this.nameMustBeUnique(project),
      this.nameMustHaveMaximum50Characters(project)
    );
  }

  onUpdate(project) {
    return this.resolveValidationPromises(
      this.colorMustHaveMaximum20Characters(project),
      this.descriptionMustHaveMaximum500Characters(project),
      this.iconMustHaveMaximum20Characters(project),
      this.nameIsRequired(project),
      this.nameMustBeUnique(project),
      this.nameMustHaveMaximum50Characters(project)
    );
  }

  colorMustHaveMaximum20Characters({color}) {
    if (color && color.length > COLOR_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemSeverity.color.maxlength', 'Color must have a maximum of 20 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  descriptionMustHaveMaximum500Characters({description}) {
    if (description && description.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemSeverity.description.maxlength', 'Description must have a maximum of 500 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  iconMustHaveMaximum20Characters({icon}) {
    if (icon && icon.length > ICON_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemSeverity.icon.maxlength', 'Icon must have a maximum of 20 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  nameIsRequired({name}) {
    if (!trim(name)) {
      const businessCase = new BusinessCase('workItemSeverity.name.required', 'Name is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  nameMustBeUnique({id, name, projectId}) {
    const quering = {
      attributes: ['id'],
      where: {
        name,
        projectId
      }
    };

    return this.workItemSeverityModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          const businessCase = new BusinessCase('workItemSeverity.name.unique', 'Name must be unique');
          return Promise.resolve(businessCase);
        }
        return Promise.resolve();
      });
  }

  nameMustHaveMaximum50Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemSeverity.name.maxlength', 'Name must have a maximum of 50 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  projectIsRequired({projectId}) {
    if (!trim(projectId)) {
      const businessCase = new BusinessCase('workItemSeverity.project.required', 'Project is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }
}

module.exports = WorkItemSeverityValidate;
