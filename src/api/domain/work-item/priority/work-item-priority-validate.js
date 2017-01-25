'use strict';

const {AbstractValidate, BusinessCase} = require('business-error');
const {DESCRIPTION_MAXLENGTH, NAME_MAXLENGTH} = require('./work-item-priority-model');
const {trim} = require('lodash');

class WorkItemPriorityValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.workItemPriorityModel = app.domain.workItem.priority.WorkItemPriorityModel;
  }

  onCreate(workItemPriority) {
    return this.resolveValidationPromises(
      this.descriptionMustHaveMaximum500Characters(workItemPriority),
      this.nameIsRequired(workItemPriority),
      this.nameMustBeUnique(workItemPriority),
      this.nameMustHaveMaximum50Characters(workItemPriority)
    );
  }

  onUpdate(workItemPriority) {
    return this.resolveValidationPromises(
      this.descriptionMustHaveMaximum500Characters(workItemPriority),
      this.nameIsRequired(workItemPriority),
      this.nameMustBeUnique(workItemPriority),
      this.nameMustHaveMaximum50Characters(workItemPriority)
    );
  }

  descriptionMustHaveMaximum500Characters({description}) {
    if (description && description.length > DESCRIPTION_MAXLENGTH) {
      const businessCase = new BusinessCase('workItemPriority.description.maxlength', 'Description must have a maximum of 500 characters');

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

  nameMustBeUnique({id, name}) {
    const quering = {
      attributes: ['id'],
      where: {name}
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
}

module.exports = WorkItemPriorityValidate;
