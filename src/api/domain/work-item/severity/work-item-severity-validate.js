'use strict';

const {AbstractValidate, BusinessCase} = require('business-error');
const {DESCRIPTION_MAXLENGTH, COLOR_MAXLENGTH, ICON_MAXLENGTH, NAME_MAXLENGTH} = require('./work-item-severity-model');
const {trim} = require('lodash');
const isColor = require('is-color');

class WorkItemSeverityValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.workItemSeverityModel = app.domain.workItem.severity.WorkItemSeverityModel;
  }

  onCreate(workItemSeverity) {
    return this.resolveValidationPromises(
      this.colorMustBeValid(workItemSeverity),
      this.colorMustHaveMaximum30Characters(workItemSeverity),
      this.descriptionMustHaveMaximum500Characters(workItemSeverity),
      this.iconMustHaveMaximum20Characters(workItemSeverity),
      this.nameIsRequired(workItemSeverity),
      this.nameMustBeUnique(workItemSeverity),
      this.nameMustHaveMaximum50Characters(workItemSeverity)
    );
  }

  onUpdate(workItemSeverity) {
    return this.resolveValidationPromises(
      this.colorMustBeValid(workItemSeverity),
      this.colorMustHaveMaximum30Characters(workItemSeverity),
      this.descriptionMustHaveMaximum500Characters(workItemSeverity),
      this.iconMustHaveMaximum20Characters(workItemSeverity),
      this.nameIsRequired(workItemSeverity),
      this.nameMustBeUnique(workItemSeverity),
      this.nameMustHaveMaximum50Characters(workItemSeverity)
    );
  }

  colorMustBeValid({color}) {
    if (color && !isColor(color)) {
      const businessCase = new BusinessCase('workItemSeverity.color.iscolor', 'Color must be valid');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  colorMustHaveMaximum30Characters({color}) {
    if (color && color.length > COLOR_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemSeverity.color.maxlength', 'Color must have a maximum of 30 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  descriptionMustHaveMaximum500Characters({description}) {
    if (description && description.length > DESCRIPTION_MAXLENGTH) {
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

  nameMustBeUnique({id, name}) {
    const quering = {
      attributes: ['id'],
      where: {name}
    };

    return this.workItemSeverityModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          return new BusinessCase('workItemSeverity.name.unique', 'Name must be unique');
        }

        return null;
      });
  }

  nameMustHaveMaximum50Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemSeverity.name.maxlength', 'Name must have a maximum of 50 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }
}

module.exports = WorkItemSeverityValidate;
