'use strict';
const documentoService = require('./document-service');
const routeResolve = require('../../modules/route-resolve');

module.exports = app => {
  app
    .route('/service/document')
    .get((req, res) => {
      const promise = documentoService.pesquisar(req.query);
      routeResolve.get(res, promise);
      // documentoService
      //   .pesquisar(req.query)
      //   .then(result => res.json(result))
      //   .catch(error => res.status(HttpStatus.PRECONDITION_FAILED).json({
      //     error: error.errors,
      //     message: error.message
      //   }));
    });
};
