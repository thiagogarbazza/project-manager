'use strict';
const ROUTE_URL = '/service/document/c957323b-3435-4384-9311-de21624b329f';

describe('route: /service/document/:uuid PUT', () => {
  it('test', done => {
    const DOCUMENT_EXPECT = {
      id: '01'
    };

    request.put(ROUTE_URL)
      .send({
        name: 'document types story updated'
      })
      .expect(HttpStatus.NO_CONTENT)
      .end(done);
  });
});
