'use strict';
const {ExtractJwt, Strategy} = require('passport-jwt');
const environment = require('../environment');
const passport = require('passport');
const UserService = require('../domain/security/user/user-service');

module.exports = app => {
  const userService = new UserService(app);
  const configuration = environment.authentication;

  const params = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: configuration.passphrase
  };

  const strategy = new Strategy(params, ({id}, done) => {
    userService.findById(id)
      .then(user => {
        if (user) {
          return done(null, {id});
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  app.authentication = {
    authenticate: () => passport.authenticate('jwt', configuration.options),
    initialize: () => passport.initialize()
  };
};
