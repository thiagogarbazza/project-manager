'use strict';

const {AbstractValidate, BusinessCase} = require('business-error');
const {DESCRIPTION_MAXLENGTH, COLOR_MAXLENGTH, ICON_MAXLENGTH, NAME_MAXLENGTH} = require('./work-item-type-model');
const {trim} = require('lodash');
const isColor = require('is-color');

class WorkItemTypeValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.workItemTypeModel = app.domain.workItem.type.WorkItemTypeModel;
  }

  onCreate(workItemType) {
    return this.resolveValidationPromises(
      this.colorMustBeValid(workItemType),
      this.colorMustHaveMaximum30Characters(workItemType),
      this.descriptionMustHaveMaximum500Characters(workItemType),
      this.iconMustHaveMaximum20Characters(workItemType),
      this.nameIsRequired(workItemType),
      this.nameMustBeUnique(workItemType),
      this.nameMustHaveMaximum50Characters(workItemType)
    );
  }

  onUpdate(workItemType) {
    return this.resolveValidationPromises(
      this.colorMustBeValid(workItemType),
      this.colorMustHaveMaximum30Characters(workItemType),
      this.descriptionMustHaveMaximum500Characters(workItemType),
      this.iconMustHaveMaximum20Characters(workItemType),
      this.nameIsRequired(workItemType),
      this.nameMustBeUnique(workItemType),
      this.nameMustHaveMaximum50Characters(workItemType)
    );
  }

  colorMustBeValid({color}) {
    if (color && !isColor(color)) {
      const businessCase = new BusinessCase('workItemType.color.iscolor', 'Color must be valid');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  colorMustHaveMaximum30Characters({color}) {
    if (color && color.length > COLOR_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemType.color.maxlength', 'Color must have a maximum of 30 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  descriptionMustHaveMaximum500Characters({description}) {
    if (description && description.length > DESCRIPTION_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemType.description.maxlength', 'Description must have a maximum of 500 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  iconMustHaveMaximum20Characters({icon}) {
    if (icon && icon.length > ICON_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemType.icon.maxlength', 'Icon must have a maximum of 20 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  nameIsRequired({name}) {
    if (!trim(name)) {
      const businessCase = new BusinessCase('workItemType.name.required', 'Name is required');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  nameMustBeUnique({id, name}) {
    const quering = {
      attributes: ['id'],
      where: {name}
    };

    return this.workItemTypeModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          return new BusinessCase('workItemType.name.unique', 'Name must be unique');
        }

        return null;
      });
  }

  nameMustHaveMaximum50Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemType.name.maxlength', 'Name must have a maximum of 50 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }
}

module.exports = WorkItemTypeValidate;
