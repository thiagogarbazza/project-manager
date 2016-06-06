module.exports = app => {
  const Projects = app.domain.project.Projects;
  const sequelize = app.sequelize;
  const authentication = app.authentication;

  app.route("/service/project")
  //.all(authentication.authenticate())

  .get((req, res) => {
    Projects.findAll({order: 'code ASC'})
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  })

  .post((req, res) => {
    Projects.create(req.body)
    .then(result => res.status(201).json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });

  app.route("/service/project/search")
  //.all(authentication.authenticate())
  .get((req, res) => {
    let where = {};

    if(req.query.code_eq)
      where.code = req.query.code_eq;
    if(req.query.code)
      where.code = {like: '%' + req.query.code + '%'};
    if(req.query.name)
      where.name = {like: '%' + req.query.name + '%'};

    Projects.findAll({where, order: 'code ASC'})
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  })

  app.route("/service/project/:uuid")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    Projects.findOne({
      where: {
        id: req.params.uuid,
      }
    })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  })

  .put((req, res) => {
    Projects.update(req.body, {
      where: {
        id: req.params.uuid,
      }
    })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  })

  .delete((req, res) => {
    Projects.destroy({
      where: {
        id: req.params.uuid,
      }
    })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });
};
