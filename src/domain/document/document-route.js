module.exports = app => {
  const Documents = app.domain.document.Documents;
  const sequelize = app.sequelize;

  app.route("/service/document")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    Documents.findAll({attributes: ['id', 'code', 'name'], order: 'code ASC'})
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  })

  .post((req, res) => {
    Documents.create(req.body)
    .then(result => res.status(201).json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });

  });

  app.route("/service/document/search")
  .get((req, res) => {
    let where = {};

    //where.projectId = req.query.projectId;

    if(req.query.code)
      where.code = {like: '%' + req.query.code + '%'};
    if(req.query.name)
      where.name = {like: '%' + req.query.name + '%'};

    Documents.findAll({ attributes: ['id', 'code', 'name'], where, order: 'code ASC'})
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

  app.route("/service/document/:uuid")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    Documents.findOne({
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
    Documents.update(req.body, {
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
    Documents.destroy({
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
