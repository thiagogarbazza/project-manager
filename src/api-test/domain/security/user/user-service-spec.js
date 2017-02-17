'use strict';

const USER_VALIDATE = class {
  onCreate(user) {
    return user.email ? Promise.resolve() : Promise.reject({name: 'BusinessError'});
  }
  onUpdate(user) {
    return user.email ? Promise.resolve() : Promise.reject({name: 'BusinessError'});
  }
};

describe('api domain security user service', () => {
  const APP = {};
  let USER;
  let UserService;
  let userService;

  before(() => {
    mockery.registerMock('./user-validate', USER_VALIDATE);
    mockery.registerAllowable('../../../../api/domain/security/user/user-service');
    UserService = require('../../../../api/domain/security/user/user-service');
  });

  after(() => {
    mockery.deregisterMock('./user-validate');
  });

  beforeEach(() => {
    dottie.set(APP, 'domain.security.user.UserModel', {});

    USER = {
      email: 'thiagogarbazza@gmail.com',
      id: '36726e94-fbd2-4152-a0ac-92ac494ce65a',
      name: 'Thiago Garbazza',
      password: 'swordfish'
    };

    userService = new UserService(APP);
  });

  it('should be defined', () => {
    expect(userService).to.not.be.undefined;
  });

  describe('# create', () => {
    beforeEach(() => {
      delete USER.id;
    });

    it('create a new valid user', done => {
      APP.domain.security.user.UserModel.create = simpleMock.stub().resolveWith(USER);

      userService.create(USER)
        .then(() => {
          expect(APP.domain.security.user.UserModel.create.callCount).to.equal(1);

          return done();
        })
        .catch(done);
    });

    it('create a new invalid user', done => {
      const anotherUser = clone(USER);

      delete anotherUser.email;
      APP.domain.security.user.UserModel.create = simpleMock.stub().resolveWith();

      userService.create(anotherUser)
        .then(() => done('user should be invalid!'))
        .catch(error => {
          expect(APP.domain.security.user.UserModel.create.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');

          return done();
        });
    });
  });

  describe('# find', () => {
    it('search a user by name', done => {
      const filter = {name: 'another user'};

      APP.domain.security.user.UserModel.findAll = simpleMock.stub().resolveWith();

      userService.find(filter)
        .then(() => {
          const quering = APP.domain.security.user.UserModel.findAll.lastCall.arg;

          expect(APP.domain.security.user.UserModel.findAll.callCount).to.equal(1);
          expect(quering.where.name).to.deep.equal({like: '%another user%'});

          return done();
        })
        .catch(done);
    });
  });

  describe('# findByEmail', () => {
    it('find user by e-mail', done => {
      APP.domain.security.user.UserModel.findOne = simpleMock.stub().resolveWith();

      userService.findByEmail(USER.email)
        .then(() => {
          const quering = APP.domain.security.user.UserModel.findOne.lastCall.arg;

          expect(APP.domain.security.user.UserModel.findOne.callCount).to.equal(1);
          expect(quering.where.email).to.equal(USER.email);

          return done();
        })
        .catch(done);
    });
  });

  describe('# findById', () => {
    it('find user by ID', done => {
      APP.domain.security.user.UserModel.findById = simpleMock.stub().resolveWith();

      userService.findById(USER.id)
        .then(() => {
          expect(APP.domain.security.user.UserModel.findById.callCount).to.equal(1);
          expect(APP.domain.security.user.UserModel.findById.lastCall.arg).to.equal(USER.id);

          return done();
        })
        .catch(done);
    });
  });

  describe('# update', () => {
    it('update a valid user', done => {
      APP.domain.security.user.UserModel.update = simpleMock.stub().resolveWith(USER);

      userService.update(USER.id, USER)
        .then(() => {
          expect(APP.domain.security.user.UserModel.update.callCount).to.equal(1);

          return done();
        })
        .catch(done);
    });

    it('update a invalid user', done => {
      const anotherUser = clone(USER);

      delete anotherUser.email;
      APP.domain.security.user.UserModel.update = simpleMock.stub().resolveWith(USER);

      userService.update(anotherUser.id, anotherUser)
        .then(() => done('user should be invalid!'))
        .catch(error => {
          expect(APP.domain.security.user.UserModel.update.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');

          return done();
        });
    });
  });
});
