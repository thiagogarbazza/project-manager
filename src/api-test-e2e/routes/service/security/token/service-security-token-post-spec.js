'use strict';
const ROUTE_URL = '/service/security/token';

describe(`route: ${ROUTE_URL} POST`, () => {
  before('prepare database', done => dataBase.init(done));

  it('01. generate token by user Thiago Garbazza', done => {
    const user = {
      email: 'thiagogarbazza@gmail.com',
      password: 'swordfish'
    };

    request.post(ROUTE_URL)
      .send(user)
      .expect(HttpStatus.OK)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((error, response) => {
        if (error) return done(error);

        expect(response.body.id).to.equal('a3381700-d485-4648-8549-829c4b036005');
        expect(response.body.name).to.equal('Thiago Garbazza');
        expect(response.body.tokenCreatedAt).to.not.undefined;
        expect(response.body.token).to.not.undefined;
        return done();
      });
  });

  it('02. generate token by user Sr. Miyagi', done => {
    const user = {
      email: 'kesuke.miyagi@gmail.com',
      password: 'swordfish'
    };

    request.post(ROUTE_URL)
      .send(user)
      .expect(HttpStatus.UNAUTHORIZED)
      .end((error, response) => {
        if (error) return done(error);
        expect(response.body.message).to.equal('Email and password were not recognized');
        return done();
      });
  });
});
