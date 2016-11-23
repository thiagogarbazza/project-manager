'use strict';

const CLIENT = {
  active: true,
  color: '',
  id: '2103c936-6613-4479-975c-cd1a87fe1e41',
  name: 'Internal'
};

const CLIENT_VALIDATE = class {
  constructor(app) {}
  onCreate(client) {
    return client.name ? Promise.resolve() : Promise.reject({
      name: 'BusinessError'
    });
  }
  onUpdate(client) {
    return client.name ? Promise.resolve() : Promise.reject({
      name: 'BusinessError'
    });
  }
};

describe('api domain client service', () => {
  const APP = {};
  let USER;
  let ClientService;
  let clientService;

  before(() => {
    mockery.registerMock('./client-validate', CLIENT_VALIDATE);
    mockery.registerAllowable('../../../api/domain/client/client-service');
    ClientService = require('../../../api/domain/client/client-service');
  });

  after(() => {
    mockery.deregisterMock('./client-validate');
  });

  beforeEach(() => {
    dottie.set(APP, 'domain.client.ClientModel', {});
    dottie.set(APP, 'domain.security.user.UserModel', {});

    USER = {
      email: 'thiagogarbazza@gmail.com',
      id: '36726e94-fbd2-4152-a0ac-92ac494ce65a',
      name: 'Thiago Garbazza',
      password: 'swordfish'
    };

    clientService = new ClientService(APP);
  });

  it('should be defined', () => {
    expect(clientService).to.not.be.undefined;
  });

  describe('# create', () => {
    beforeEach(() => {
      delete CLIENT.id;
    });

    it('create a new valid client', done => {
      APP.domain.client.ClientModel.create = simpleMock.stub().resolveWith(CLIENT);

      clientService.create(CLIENT, USER)
        .then(result => {
          expect(APP.domain.client.ClientModel.create.callCount).to.equal(1);
          done();
        })
        .catch(done);
    });

    it('create a new invalid client', done => {
      APP.domain.client.ClientModel.create = simpleMock.stub().resolveWith();

      const anotherClient = clone(CLIENT);
      delete anotherClient.name;

      clientService.create(anotherClient, USER)
        .then(() => done('user should be invalid!'))
        .catch(error => {
          expect(APP.domain.client.ClientModel.create.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');
          done();
        });
    });
  });

  describe('# destroy', () => {
    it('destroy a client', done => {
      APP.domain.client.ClientModel.destroy = simpleMock.stub().resolveWith();

      clientService.destroy(CLIENT.id)
        .then(() => {
          expect(APP.domain.client.ClientModel.destroy.callCount).to.equal(1);
          const quering = APP.domain.client.ClientModel.destroy.lastCall.arg;
          expect(quering.where.id).to.equal(CLIENT.id);
          done();
        })
        .catch(done);
    });
  });

  describe('# find', () => {
    it('search a client by name', done => {
      APP.domain.client.ClientModel.findAll = simpleMock.stub().resolveWith();
      const filter = {
        name: 'another client'
      };

      clientService.find(filter)
        .then(() => {
          expect(APP.domain.client.ClientModel.findAll.callCount).to.equal(1);
          const quering = APP.domain.client.ClientModel.findAll.lastCall.arg;
          expect(quering.where.name).to.deep.equal({
            like: '%another client%'
          });
          done();
        })
        .catch(done);
    });
  });

  describe('# findById', () => {
    it('find a client by ID', done => {
      APP.domain.client.ClientModel.findById = simpleMock.stub().resolveWith();

      clientService.findById(CLIENT.id)
        .then(() => {
          expect(APP.domain.client.ClientModel.findById.callCount).to.equal(1);
          expect(APP.domain.client.ClientModel.findById.lastCall.arg).to.equal(CLIENT.id);
          done();
        })
        .catch(done);
    });
  });

  describe('# update', () => {
    it('update a valid client', done => {
      APP.domain.client.ClientModel.update = simpleMock.stub().resolveWith(CLIENT);

      clientService.update(CLIENT.id, CLIENT, USER)
        .then(result => {
          expect(APP.domain.client.ClientModel.update.callCount).to.equal(1);
          done();
        })
        .catch(done);
    });

    it('update a invalid client', done => {
      APP.domain.client.ClientModel.update = simpleMock.stub().resolveWith(CLIENT);

      const anotherClient = clone(CLIENT);
      delete anotherClient.name;

      clientService.update(anotherClient.id, anotherClient, USER)
        .then(() => done('client should be invalid!'))
        .catch(error => {
          expect(APP.domain.client.ClientModel.update.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');
          done();
        });
    });
  });
});
