'use strict';
const configuration = require('../configuration');
const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = app => {
  const Users = app.domain.user.Users;

  const params = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: configuration.authentication.passphrase
  };

  const strategy = new Strategy(params, (payload, done) => {
    Users.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id
          });
        }

        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  app.authentication = {
    authenticate: () => passport.authenticate('jwt', configuration.authentication.options),
    initialize: () => passport.initialize()
  };
};
