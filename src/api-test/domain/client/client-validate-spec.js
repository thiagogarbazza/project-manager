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
      id: '61361f65-cb46-4d24-8cac-b085c1c4961c',
      name: ''
    };

    clientValidate = new ClientValidate(APP);
  });

  it('should be defined', () => {
    expect(clientValidate).to.not.be.undefined;
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
    anotherClient.id = '2103c936-6613-4479-975c-cd1a87fe1e41';
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
});
