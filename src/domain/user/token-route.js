let jwt = require("jwt-simple");


module.exports = app => {
  const configuration = app.configuration.authentication;
  const Users = app.domain.user.Users;

  app.post("/token", (req, res) => {
    console.log('#####body',req.body);
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Users.findOne({where: {email: email}})
        .then(user => {
          if (user.isPassword(user.password, password)) {
            const payload = {
              "id": user.id,
              "createAt": new Date()
            };

            res.json({
              "token": jwt.encode(payload, configuration.passphrase),
              "name": user.name,
              "email": user.email
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  });
};
