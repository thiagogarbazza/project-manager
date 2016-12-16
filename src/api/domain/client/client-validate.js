'use strict';

const {AbstractValidate, BusinessCase} = require('business-error');
const {trim} = require('lodash');

const COLOR_MAXLENGTH = 20;
const NAME_MAXLENGTH = 100;

class ClientValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.clientModel = app.domain.client.ClientModel;
  }

  onCreate(client) {
    return this.resolveValidationPromises(
      this.colorMustHaveMaximum20Characters(client),
      this.nameIsRequired(client),
      this.nameMustBeUnique(client),
      this.nameMustHaveMaximum100Characters(client)
    );
  }

  onUpdate(client) {
    return this.resolveValidationPromises(
      this.colorMustHaveMaximum20Characters(client),
      this.nameIsRequired(client),
      this.nameMustBeUnique(client),
      this.nameMustHaveMaximum100Characters(client)
    );
  }

  colorMustHaveMaximum20Characters({color}) {
    if (color && color.length > COLOR_MAXLENGTH) {
      const businessCase = new BusinessCase('client.color.maxlength', 'Color must have a maximum of 20 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  nameIsRequired({name}) {
    if (!trim(name)) {
      const businessCase = new BusinessCase('client.name.required', 'Name is required');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  nameMustBeUnique({id, name}) {
    const quering = {
      attributes: ['id'],
      where: {name}
    };

    return this.clientModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          return new BusinessCase('client.name.unique', 'Name must be unique');
        }

        return null;
      });
  }

  nameMustHaveMaximum100Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('client.name.maxlength', 'Name must have a maximum of 100 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }
}

module.exports = ClientValidate;
