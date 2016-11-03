'use strict';
const {AbstractValidate, BusinessCase} = require('business-error');
const {trim} = require('lodash');
const {isEmail} = require('validator');

const NAME_MAXLENGTH = 100;

class ClientValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.clientModel = app.domain.client.ClientModel;
  }

  onCreate(client) {
    return this.resolveValidationPromises(
      this.nameIsRequired(client)
    );
  }

  onUpdate(client) {
    return this.resolveValidationPromises(
      this.nameIsRequired(client)
    );
  }

  nameIsRequired({name}) {
    if (!trim(name)) {
      const businessCase = new BusinessCase('client.name.required', 'Name is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  nameMustHaveMaximum100Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('client.name.maxlength', 'Name must have a maximum of 100 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  colorMustHaveMaximum20Characters({color}) {
    if (color && color.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('client.color.maxlength', 'Color must have a maximum of 20 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }
}

module.exports = ClientValidate;
