module.exports = app => {
  const Projects = app.domain.project.Projects;
  const sequelize = app.sequelize;

  app.route("/service/project")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    Projects.findAll({order: 'sigla ASC'})
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
  .get((req, res) => {
    let where = {};

    if(req.query.sigla)
      where.sigla = {like: '%' + req.query.sigla + '%'}
    if(req.query.nome)
      where.nome = {like: '%' + req.query.nome + '%'}

    Projects.findAll({where, order: 'sigla ASC'})
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

  app.route("/service/project/:id")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    Projects.findOne({
      where: {
        id: req.params.id,
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
        id: req.params.id,
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
        id: req.params.id,
      }
    })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });


};
