'use strict';
const chai = require('chai');
const clone = require('lodash').clone;
const expect = chai.expect;
const HttpStatus = require('http-status-codes');


const ROUTE_URL = '/service/document/c957323b-3435-4384-9311-de21624b329f';

describe('route: /service/document/:uuid GET', () => {
  it('test', done => {
    const DOCUMENT_EXPECT = {
      id: '01',
      name: 'Acordo ortográfico brasileiro'
    };

    request.get(ROUTE_URL)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HttpStatus.OK, DOCUMENT_EXPECT)
      .end(done);
  });
});
