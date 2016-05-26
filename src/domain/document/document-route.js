module.exports = app => {
  const Projects = app.domain.project.Projects;
  const Documents = app.domain.document.Documents;
  const sequelize = app.sequelize;

  app.route("/service/document")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    Documents.findAll({order: 'code ASC'})
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  })

  .post((req, res) => {
    Projects.findOne({where: {code: "AUDINT"}})
      .then(result => {
        req.body.project_id = result.id;

        Documents.create(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });

      })
      .catch(error => {
        res.status(500).json({msg: "Não existe nenhum projecto cadastrado com o código AUDINT"});
      });


  });

  app.route("/service/document/search")
  .get((req, res) => {
    let where = {};

    if(req.query.projectId)
      where.projct_id = req.query.projectId;
    if(req.query.code)
      where.code = {like: '%' + req.query.code + '%'};
    if(req.query.name)
      where.name = {like: '%' + req.query.name + '%'};

    Documents.findAll({where, order: 'code ASC'})
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

  app.route("/service/document/:id")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    Documents.findOne({
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
    Documents.update(req.body, {
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
    Documents.destroy({
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
