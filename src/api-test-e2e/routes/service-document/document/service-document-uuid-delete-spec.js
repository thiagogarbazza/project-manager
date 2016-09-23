'use strict';
const ROUTE_URL = '/service/document/c957323b-3435-4384-9311-de21624b329f';

describe('route: /service/document/:uuid DELETE', () => {
  it('test', done => {
    request.delete(ROUTE_URL)
      .expect(HttpStatus.NO_CONTENT)
      .end(done);
  });
});
