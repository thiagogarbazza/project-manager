'use strict';

const {AbstractValidate, BusinessCase} = require('business-error');
const {EMAIL_MAXLENGTH, NAME_MAXLENGTH} = require('./user-model');
const {isEmail} = require('validator');
const {trim} = require('lodash');

const PASSWORD_MINLENGTH = 5;

class UserValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.userModel = app.domain.security.user.UserModel;
  }

  onCreate(user) {
    return this.resolveValidationPromises(
      this.emailIsRequired(user),
      this.emailIsValid(user),
      this.emailMustHaveMaximum250Characters(user),
      this.emailMustBeUnique(user),
      this.nameIsRequired(user),
      this.nameMustHaveMaximum100Characters(user),
      this.passwordIsRequired(user),
      this.passwordMustHaveMinimum5Characters(user)
    );
  }

  onUpdate(user) {
    return this.resolveValidationPromises(
      this.emailIsRequired(user),
      this.emailIsValid(user),
      this.emailMustHaveMaximum250Characters(user),
      this.emailMustBeUnique(user),
      this.nameIsRequired(user),
      this.nameMustHaveMaximum100Characters(user),
      this.passwordIsRequired(user),
      this.passwordMustHaveMinimum5Characters(user)
    );
  }

  emailIsRequired({email}) {
    if (!trim(email)) {
      const businessCase = new BusinessCase('user.email.required', 'E-mail is required');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  emailIsValid({email}) {
    if (email && !isEmail(email)) {
      const businessCase = new BusinessCase('user.email.valid', 'E-mail must be valid');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  emailMustHaveMaximum250Characters({email}) {
    if (email && email.length > EMAIL_MAXLENGTH) {
      const businessCase = new BusinessCase('user.email.maxlength', 'E-mail must have a maximum of 250 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  emailMustBeUnique({email, id}) {
    const quering = {
      attributes: ['id'],
      where: {email}
    };

    return this.userModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          return new BusinessCase('user.email.unique', 'E-mail must be unique');
        }

        return null;
      });
  }

  nameIsRequired({name}) {
    if (!trim(name)) {
      const businessCase = new BusinessCase('user.name.required', 'Name is required');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  nameMustHaveMaximum100Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('user.name.maxlength', 'Name must have a maximum of 100 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  passwordIsRequired({password}) {
    if (!trim(password)) {
      const businessCase = new BusinessCase('user.password.required', 'Password is required');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }

  passwordMustHaveMinimum5Characters({password}) {
    if (password && password.length < PASSWORD_MINLENGTH) {
      const businessCase = new BusinessCase('user.password.minlength', 'Password must have a minimum  of 5 characters');

      return Promise.resolve(businessCase);
    }

    return Promise.resolve();
  }
}

module.exports = UserValidate;
