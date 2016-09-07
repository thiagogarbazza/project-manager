module.exports = app => {
  const DocumentStates = app.domain.document.DocumentStates;
  const sequelize = app.sequelize;

  app.route("/service/document/state")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    DocumentStates.findAll({order: 'name ASC'})
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  })

  .post((req, res) => {
    DocumentStates.create(req.body)
    .then(result => res.status(201).json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });

  app.route("/service/document/state/search")
  .get((req, res) => {
    let where = {};

    if(req.query.name)
      where.name = {like: '%' + req.query.name + '%'}

    DocumentStates.findAll({where, order: 'name ASC'})
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

  app.route("/service/document/state/:uuid")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    DocumentStates.findOne({
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
    DocumentStates.update(req.body, {
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
    DocumentStates.destroy({
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
