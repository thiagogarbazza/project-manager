'use strict';
const chai = require('chai');
const clone = require('lodash').clone;
const expect = chai.expect;
const HttpStatus = require('http-status-codes');


const ROUTE_URL = '/service/document';

describe('route: /service/document GET', () => {
  before(() => console.log('Carregar a base de dados...'));


  it('deve recuperar os documentos ordenados pelo nome', done => {
    const DOCUMENT_EXPECT = [{
      id: '01',
      name: 'Acordo ortográfico brasileiro'
    }, {
      id: '02',
      name: 'Uso capião o que é?'
    }];

    request.get(ROUTE_URL)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HttpStatus.OK, DOCUMENT_EXPECT)
      .end(done);
  });
});
