let passport = require("passport");
let Strategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

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
      return passport.initialize();
    },
    "authenticate": () => {
      return passport.authenticate("jwt", configuration.options);
    }
  };
};
