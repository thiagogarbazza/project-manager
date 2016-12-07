'use strict';

const {AbstractValidate, BusinessCase} = require('business-error');
const {trim} = require('lodash');
const moment = require('moment');

const NAME_MAXLENGTH = 100;

class IterationValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.iterationModel = app.domain.iteration.IterationModel;
  }

  onCreate(iteration) {
    return this.resolveValidationPromises(
      this.endIsRequired(iteration),
      this.endMustBeGreaterThanAStart(iteration),
      this.nameIsRequired(iteration),
      this.nameMustBeUnique(iteration),
      this.nameMustHaveMaximum100Characters(iteration),
      this.projectIsRequired(iteration),
      this.startIsRequired(iteration)
    );
  }

  onUpdate(iteration) {
    return this.resolveValidationPromises(
      this.endIsRequired(iteration),
      this.endMustBeGreaterThanAStart(iteration),
      this.nameIsRequired(iteration),
      this.nameMustBeUnique(iteration),
      this.nameMustHaveMaximum100Characters(iteration),
      this.projectIsRequired(iteration),
      this.startIsRequired(iteration)
    );
  }

  endIsRequired({end}) {
    if (!trim(end)) {
      const businessCase = new BusinessCase('iteration.end.required', 'End date is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  endMustBeGreaterThanAStart({end, start}) {
    if (end && start) {
      if (!moment(start).isBefore(moment(end), 'day')) {
        const businessCase = new BusinessCase('iteration.end.must-be-greater-than-a-start', 'End date must be greater than a start date');
        return Promise.resolve(businessCase);
      }
    }
    return Promise.resolve();
  }

  nameIsRequired({name}) {
    if (!trim(name)) {
      const businessCase = new BusinessCase('iteration.name.required', 'Name is required');
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

    return this.iterationModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          const businessCase = new BusinessCase('iteration.name.unique', 'Name must be unique');
          return Promise.resolve(businessCase);
        }
        return Promise.resolve();
      });
  }

  nameMustHaveMaximum100Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('iteration.name.maxlength', 'Name must have a maximum of 100 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  projectIsRequired({projectId}) {
    if (!trim(projectId)) {
      const businessCase = new BusinessCase('iteration.project.required', 'Project is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  startIsRequired({start}) {
    if (!trim(start)) {
      const businessCase = new BusinessCase('iteration.start.required', 'Start date is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }
}

module.exports = IterationValidate;
