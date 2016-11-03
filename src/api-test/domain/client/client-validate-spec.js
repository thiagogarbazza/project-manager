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
      id: 'c27ea34a-0fed-4a93-821f-9b7371f28863',
      color: '',
      name: '',
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

  it('color should be maximum 100 characters', done => {
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
