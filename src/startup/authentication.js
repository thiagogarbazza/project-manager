const passport = require("passport");
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const logger = require("../logger");

module.exports = app => {
  const Users = app.domain.user.Users;
  const configuration = app.configuration.authentication;

  const params = {
    secretOrKey: configuration.passphrase,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  };

  const strategy = new Strategy(params, (payload, done) => {
    Users.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email
          });
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  app.authentication =  {
    "initialize": () => {
      logger.info('Initialize security context.');
      return passport.initialize();
    },
    "authenticate": () => {
      return passport.authenticate("jwt", configuration.options);
    }
  };
};
