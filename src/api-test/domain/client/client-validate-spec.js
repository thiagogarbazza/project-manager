'use strict';
const ClientValidate = require('../../../api/domain/client/client-validate');

describe('api domain client validate', () => {
  const APP = {};
  let CLIENT;
  let clientValidate;

  beforeEach(() => {
    dottie.set(APP, 'domain.client.ClientModel', {});

    CLIENT = {
      active: true,
      color: '',
      id: '2103c936-6613-4479-975c-cd1a87fe1e41',
      name: 'Internal'
    };

    clientValidate = new ClientValidate(APP);
  });

  it('should be defined', () => {
    expect(clientValidate).to.not.be.undefined;
  });

  it('color should be maximum 20 characters', done => {
    CLIENT.color = properties.BIG_TEXT;

    clientValidate.colorMustHaveMaximum20Characters(CLIENT)
      .then(result => {
        expect(result.code).to.equal('client.color.maxlength');
        expect(result.message).to.equal('Color must have a maximum of 20 characters');
        return done();
      })
      .catch(done);
  });

  it('name should be required', done => {
    delete CLIENT.name;

    clientValidate.nameIsRequired(CLIENT)
      .then(result => {
        expect(result.code).to.equal('client.name.required');
        expect(result.message).to.equal('Name is required');
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending a new name', done => {
    const anotherClient = clone(CLIENT);
    anotherClient.name = 'Internal';
    APP.domain.client.ClientModel.findOne = simpleMock.stub().resolveWith();

    clientValidate.nameMustBeUnique(anotherClient)
      .then(() => {
        expect(APP.domain.client.ClientModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with equal ID', done => {
    const anotherClient = clone(CLIENT);
    APP.domain.client.ClientModel.findOne = simpleMock.stub().resolveWith(CLIENT);

    clientValidate.nameMustBeUnique(anotherClient)
      .then(result => {
        expect(APP.domain.client.ClientModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with different ID´s', done => {
    const anotherClient = clone(CLIENT);
    anotherClient.id = '744b22b8-c318-4d7b-8f71-7ec6cddae803';
    APP.domain.client.ClientModel.findOne = simpleMock.stub().resolveWith(CLIENT);

    clientValidate.nameMustBeUnique(anotherClient)
      .then(result => {
        expect( APP.domain.client.ClientModel.findOne.callCount).to.equal(1);
        expect(result.code).to.equal('client.name.unique');
        expect(result.message).to.equal('Name must be unique');
        return done();
      })
      .catch(done);
  });

  it('name should be maximum 100 characters', done => {
    CLIENT.name = properties.BIG_TEXT;

    clientValidate.nameMustHaveMaximum100Characters(CLIENT)
      .then(result => {
        expect(result.code).to.equal('client.name.maxlength');
        expect(result.message).to.equal('Name must have a maximum of 100 characters');
        return done();
      })
      .catch(done);
  });

  describe('# onCreate', () => {
    beforeEach(() => {
      delete CLIENT.id;
      APP.domain.client.ClientModel.findOne = simpleMock.stub().resolveWith();
    });

    it('create a new valid client', done => {
      clientValidate.onCreate(CLIENT)
        .then(() => done())
        .catch(done);
    });

    it('create a new invalid client', done => {
      delete CLIENT.name;

       clientValidate.onCreate(CLIENT)
        .then(() => done('should be error'))
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(1);
          expect(error.errors[0].code).to.equal('client.name.required');
          return done();
        });
    });
  });

  describe('# onUpdate', () => {
    beforeEach(() => {
       APP.domain.client.ClientModel.findOne = simpleMock.stub().resolveWith();
    });

    it('update a valid client', done => {
      clientValidate.onUpdate(CLIENT)
        .then(() => done())
        .catch(error => done(error));
    });

    it('update a invalid client', done => {
      delete CLIENT.name;

      clientValidate.onUpdate(CLIENT)
        .then(() => done())
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(1);
          expect(error.errors[0].code).to.equal('client.name.required');
          return done();
        });
    });
  });
});
