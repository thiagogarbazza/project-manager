'use strict';
const chai = require('chai');
const clone = require('lodash').clone;
const expect = chai.expect;
const HttpStatus = require('http-status-codes');


const ROUTE_URL = '/service/document';

describe('route: /service/document POST', () => {
  it('test', done => {
    request.post(ROUTE_URL)
      .send({
        name: 'document types story'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HttpStatus.CREATED)
      .end((error, response) => {
        expect(response.body.id).to.not.undefined;
        expect(response.body.name).to.equal('document types story');
        done(error);
      });
  });
});
