'use strict';

const UserService = require('./user/user-service');
const environment = require('../../environment');
const jwt = require('jwt-simple');

class TokenService {
  constructor(app) {
    this.configuration = environment.authentication;
    this.userService = new UserService(app);
  }

  generate({email, password}) {
    if (!email || !password) {
      return Promise.reject(new Error('To generate token a email and password should be informed'));
    }

    return this.userService.findByEmail(email)
      .then(user => {
        if (user && user.isPassword(password)) {
          return this.createToken(user);
        }

        return Promise.reject('Email or password were not recognized');
      });
  }

  createToken(user) {
    const tokenCreatedAt = new Date();
    const payload = {
      createdAt: tokenCreatedAt,
      id: user.id
    };

    const response = {
      email: user.email,
      id: user.id,
      name: user.name,
      token: jwt.encode(payload, this.configuration.passphrase),
      tokenCreatedAt
    };

    return response;
  }
}

module.exports = TokenService;
