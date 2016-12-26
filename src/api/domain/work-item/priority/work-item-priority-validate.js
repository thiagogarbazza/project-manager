'use strict';

const {AbstractValidate, BusinessCase} = require('business-error');
const {DESCRIPTION_MAXLENGTH, COLOR_MAXLENGTH, ICON_MAXLENGTH, NAME_MAXLENGTH} = require('./work-item-priority-model');
const {trim} = require('lodash');
const isColor = require('is-color');

class WorkItemPriorityValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.workItemPriorityModel = app.domain.workItem.priority.WorkItemPriorityModel;
  }

  onCreate(workItemPriority) {
    return this.resolveValidationPromises(
      this.colorMustBeValid(workItemPriority),
      this.colorMustHaveMaximum30Characters(workItemPriority),
      this.descriptionMustHaveMaximum500Characters(workItemPriority),
      this.iconMustHaveMaximum20Characters(workItemPriority),
      this.nameIsRequired(workItemPriority),
      this.nameMustBeUnique(workItemPriority),
      this.nameMustHaveMaximum50Characters(workItemPriority)
    );
  }

  onUpdate(workItemPriority) {
    return this.resolveValidationPromises(
      this.colorMustBeValid(workItemPriority),
      this.colorMustHaveMaximum30Characters(workItemPriority),
      this.descriptionMustHaveMaximum500Characters(workItemPriority),
      this.iconMustHaveMaximum20Characters(workItemPriority),
      this.nameIsRequired(workItemPriority),
      this.nameMustBeUnique(workItemPriority),
      this.nameMustHaveMaximum50Characters(workItemPriority)
    );
  }

  colorMustBeValid({color}) {
    if (color && !isColor(color)) {
      const businessCase = new BusinessCase('workItemPriority.color.iscolor', 'Color must be valid');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  colorMustHaveMaximum30Characters({color}) {
    if (color && color.length > COLOR_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemPriority.color.maxlength', 'Color must have a maximum of 30 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  descriptionMustHaveMaximum500Characters({description}) {
    if (description && description.length > DESCRIPTION_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemPriority.description.maxlength', 'Description must have a maximum of 500 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  iconMustHaveMaximum20Characters({icon}) {
    if (icon && icon.length > ICON_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemPriority.icon.maxlength', 'Icon must have a maximum of 20 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  nameIsRequired({name}) {
    if (!trim(name)) {
      const businessCase = new BusinessCase('workItemPriority.name.required', 'Name is required');

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

    return this.workItemPriorityModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          return new BusinessCase('workItemPriority.name.unique', 'Name must be unique');
        }

        return null;
      });
  }

  nameMustHaveMaximum50Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemPriority.name.maxlength', 'Name must have a maximum of 50 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  projectIsRequired({projectId}) {
    if (!trim(projectId)) {
      const businessCase = new BusinessCase('workItemPriority.project.required', 'Project is required');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }
}

module.exports = WorkItemPriorityValidate;
