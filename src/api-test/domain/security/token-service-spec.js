'use strict';

const mockery = require('mockery');
const PATH_TO_TOKEN_SERVICE = '../../../api/domain/security/token-service';

const USER_SERVICE = class {
  findByEmail(email) {
    return email === 'thiagogarbazza@gmail.com' ? Promise.resolve(USER) : Promise.reject({name: 'Error'});
  }
};

const APP = {};
let USER;

describe('api domain security token service', () => {
  let TokenService;
  let tokenService;

  before(() => {
    mockery.registerAllowable(PATH_TO_TOKEN_SERVICE, true);
    mockery.registerMock('./user/user-service', USER_SERVICE);
    mockery.enable({useCleanCache: true});

    TokenService = require(PATH_TO_TOKEN_SERVICE);
  });

  after(() => {
    mockery.deregisterMock('./user/user-service');
    mockery.deregisterAllowable(PATH_TO_TOKEN_SERVICE);
    mockery.disable();
  });


  beforeEach(() => {
    dottie.set(APP, 'configuration.authentication.passphrase', 'TESTE');

    USER = {
      email: 'thiagogarbazza@gmail.com',
      id: '36726e94-fbd2-4152-a0ac-92ac494ce65a',
      name: 'Thiago Garbazza',
      password: 'swordfish'
    };

    tokenService = new TokenService(APP);
  });

  it('should be defined', () => {
    expect(tokenService).to.not.be.undefined;
  });

  describe('# generate', () => {
    it('try to generate token without informing the email and password', done => {
      tokenService.generate({})
        .then(() => done('should not generate TOKEN, since they were not sent e-mail and password'))
        .catch(error => {
          expect(error.name).to.equal('Error');

          return done();
        });
    });

    it('try to generate token informing the password and not informing the email', done => {
      tokenService.generate({email: 'thiagogarbazza@gmail.com'})
        .then(() => done('should not generate TOKEN, since they were not sent password'))
        .catch(error => {
          expect(error.name).to.equal('Error');

          return done();
        });
    });

    it('try to generate token informing valid email and password', done => {
      const LOGIN = {
        email: 'thiagogarbazza@gmail.com',
        password: 'swordffish'
      };

      USER.isPassword = simpleMock.stub().returnWith(true);

      tokenService.generate(LOGIN)
        .then(result => {
          expect(USER.isPassword.callCount).to.equal(1);
          expect(result.name).to.equal('Thiago Garbazza');
          expect(result.token).to.not.be.undefined;

          return done();
        })
        .catch(done);
    });

    it('try to generate token informing invalid email and password', done => {
      const LOGIN = {
        email: 'test@gmail.com',
        password: 'test'
      };

      USER.isPassword = simpleMock.stub().returnWith(true);

      tokenService.generate(LOGIN)
        .then(() => done('should not generate TOKEN, because the data is invalid'))
        .catch(error => {
          expect(USER.isPassword.callCount).to.equal(0);
          expect(error.name).to.equal('Error');

          return done();
        });
    });
  });
});
