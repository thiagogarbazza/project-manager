module.exports = app => {

  app.route('/service/document')

  .get((req, res) => {
    res.status(201).json({
      tes: 'tes'
    });
  });

};
