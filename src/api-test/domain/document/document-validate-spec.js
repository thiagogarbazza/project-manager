'use strict';
const DocumentValidate = require('../../../api/domain/document/document-validate');

describe('api domain document validate', () => {
  const APP = {};
  let DOCUMENT;
  let documentValidate;

  beforeEach(() => {
    dottie.set(APP, 'domain.document.DocumentModel', {});

    DOCUMENT = {
      content: 'test, teste,teste',
      id: 'ae8dd17d-20ae-4f52-b53f-e5c58f4708b4',
      name: 'as',
      projectId: 'dfb52b7e-e95e-4a36-905c-ba0a8478f46b'
    };

    documentValidate = new DocumentValidate(APP);
  });

  it('should be defined', () => {
    expect(documentValidate).to.not.be.undefined;
  });

  it('name should be required', done => {
    delete DOCUMENT.name;

    documentValidate.nameIsRequired(DOCUMENT)
      .then(result => {
        expect(result.code).to.equal('document.name.required');
        expect(result.message).to.equal('Name is required');
        return done();
      })
      .catch(done);
  });

  it('name should be maximum 100 characters', done => {
    DOCUMENT.name = properties.BIG_TEXT;

    documentValidate.nameMustHaveMaximum100Characters(DOCUMENT)
      .then(result => {
        expect(result.code).to.equal('document.name.maxlength');
        expect(result.message).to.equal('Name must have a maximum of 100 characters');
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending a new name', done => {
    const anotherDocument = clone(DOCUMENT);
    anotherDocument.name = 'Internal';
    APP.domain.document.DocumentModel.findOne = simpleMock.stub().resolveWith();

    documentValidate.nameMustBeUnique(anotherDocument)
      .then(() => {
        expect(APP.domain.document.DocumentModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with equal ID', done => {
    const anotherDocument = clone(DOCUMENT);
    APP.domain.document.DocumentModel.findOne = simpleMock.stub().resolveWith(DOCUMENT);

    documentValidate.nameMustBeUnique(anotherDocument)
      .then(result => {
        expect(APP.domain.document.DocumentModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with different ID´s', done => {
    const anotherDocument = clone(DOCUMENT);
    anotherDocument.id = '2103c936-6613-4479-975c-cd1a87fe1e41';
    APP.domain.document.DocumentModel.findOne = simpleMock.stub().resolveWith(DOCUMENT);

    documentValidate.nameMustBeUnique(anotherDocument)
      .then(result => {
        expect( APP.domain.document.DocumentModel.findOne.callCount).to.equal(1);
        expect(result.code).to.equal('document.name.unique');
        expect(result.message).to.equal('Name must be unique');
        return done();
      })
      .catch(done);
  });

  it('project should be required', done => {
    delete DOCUMENT.projectId;

    documentValidate.projectIsRequired(DOCUMENT)
      .then(result => {
        expect(result.code).to.equal('document.project.required');
        expect(result.message).to.equal('Project is required');
        return done();
      })
      .catch(done);
  });

  describe('# onCreate', () => {
    beforeEach(() => {
      delete DOCUMENT.id;
      APP.domain.document.DocumentModel.findOne = simpleMock.stub().resolveWith();
    });

    it('create a new valid document', done => {
      documentValidate.onCreate(DOCUMENT)
        .then(() => done())
        .catch(done);
    });

    it('create a new invalid document', done => {
      delete DOCUMENT.name;
      delete DOCUMENT.projectId;

       documentValidate.onCreate(DOCUMENT)
        .then(() => done('should be error'))
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(2);
          expect(error.errors[0].code).to.equal('document.name.required');
          expect(error.errors[1].code).to.equal('document.project.required');
          return done();
        });
    });
  });

  describe('# onUpdate', () => {
    beforeEach(() => {
       APP.domain.document.DocumentModel.findOne = simpleMock.stub().resolveWith();
    });

    it('update a valid document', done => {
      documentValidate.onUpdate(DOCUMENT)
        .then(() => done())
        .catch(error => done(error));
    });

    it('update a invalid document', done => {
      delete DOCUMENT.name;
      delete DOCUMENT.projectId;

      documentValidate.onUpdate(DOCUMENT)
        .then(() => done())
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(2);
          expect(error.errors[0].code).to.equal('document.name.required');
          expect(error.errors[1].code).to.equal('document.project.required');
          return done();
        });
    });
  });
});
