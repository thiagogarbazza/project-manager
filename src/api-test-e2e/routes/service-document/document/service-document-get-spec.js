'use strict';
const prepare = require('../../../prepare-database');


const ROUTE_URL = '/service/document';

function tet(app) {

}

describe('route: /service/document GET', () => {
  before(() => tet(app));


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
