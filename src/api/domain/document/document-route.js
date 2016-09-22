'use strict';
const DocumentoService = require('./document-service');
const routeResolve = require('../../modules/route-resolve');
const HttpStatus = require('http-status-codes');

module.exports = app => {

  const documents = [{
    id: '01',
    name: 'Acordo ortográfico brasileiro'
  }, {
    id: '02',
    name: 'Uso capião o que é?'
  }];
  app
    .route('/service/document')
    .get((request, response) => response.json(documents))
    .post((request, response) => {
      request.body.id = '03';
      response.status(HttpStatus.CREATED).json(request.body);
    });
  app
    .route('/service/document/:uuid')
    .get((request, response) => response.json(documents[0]))
    .put((request, response) => response.sendStatus(HttpStatus.NO_CONTENT))
    .delete((request, response) => response.sendStatus(HttpStatus.NO_CONTENT));


  // const documentoService = DocumentoService(app);
  // app
  //   .route('/service/document')
  //   .get((req, res) => {
  //     const promise = documentoService.find(req.query);
  //     routeResolve.find(res, promise);
  //   })
  //   .post((req, res) => {
  //     const promise = documentoService.create(req.body);
  //     routeResolve.create(res, promise);
  //   });

  // app
  //   .route('/service/document/:uuid')
  //   .get((req, res) => {
  //     const promise = documentoService.findById(req.params.uuid);
  //     routeResolve.find(res, promise);
  //   })
  //   .put((req, res) => {
  //     const promise = documentoService.update(req.params.uuid, req.body);
  //     routeResolve.update(res, promise);
  //   })
  //   .delete((req, res) => {
  //     const promise = documentoService.destroy(req.params.uuid);
  //     routeResolve.destroy(res, promise);
  //   });
};
