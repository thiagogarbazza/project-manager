module.exports = app => {
  const DocumentTypes = app.domain.document.DocumentTypes;
  const sequelize = app.sequelize;

  app.route("/service/document-type")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    DocumentTypes.findAll({order: 'code ASC'})
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  })

  .post((req, res) => {
    DocumentTypes.create(req.body)
    .then(result => res.status(201).json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });

  app.route("/service/document-type/search")
  .get((req, res) => {
    let where = {};

    if(req.query.code)
      where.code = {like: '%' + req.query.code + '%'}
    if(req.query.name)
      where.name = {like: '%' + req.query.name + '%'}

    DocumentTypes.findAll({where, order: 'code ASC'})
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

  app.route("/service/document-type/:id")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    DocumentTypes.findOne({
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
    DocumentTypes.update(req.body, {
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
    DocumentTypes.destroy({
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
