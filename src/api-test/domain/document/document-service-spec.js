'use strict';

let DOCUMENT = {
  content: 'test, teste,teste',
  id: 'ae8dd17d-20ae-4f52-b53f-e5c58f4708b4',
  name: 'as',
  projectId: 'dfb52b7e-e95e-4a36-905c-ba0a8478f46b'
};

const DOCUMENT_VALIDATE = class {
  constructor(app) {}
  onCreate(document) {
    return document.name ? Promise.resolve() : Promise.reject({
      name: 'BusinessError'
    });
  }
  onUpdate(document) {
    return document.name ? Promise.resolve() : Promise.reject({
      name: 'BusinessError'
    });
  }
};

describe('api domain document service', () => {
  const APP = {};
  let USER;
  let DocumentService;
  let documentService;

  before(() => {
    mockery.registerMock('./document-validate', DOCUMENT_VALIDATE);
    mockery.registerAllowable('../../../api/domain/document/document-service');
    DocumentService = require('../../../api/domain/document/document-service');
  });

  after(() => {
    mockery.deregisterMock('./document-validate');
  });

  beforeEach(() => {
    dottie.set(APP, 'domain.document.DocumentModel', {});
    dottie.set(APP, 'domain.security.user.UserModel', {});

    USER = {
      email: 'thiagogarbazza@gmail.com',
      id: '36726e94-fbd2-4152-a0ac-92ac494ce65a',
      name: 'Thiago Garbazza',
      password: 'swordfish'
    };

    documentService = new DocumentService(APP);
  });

  it('should be defined', () => {
    expect(documentService).to.not.be.undefined;
  });

  describe('# create', () => {
    beforeEach(() => {
      delete DOCUMENT.id;
    });

    it('create a new valid document', done => {
      APP.domain.document.DocumentModel.create = simpleMock.stub().resolveWith(DOCUMENT);

      documentService.create(DOCUMENT, USER)
        .then(result => {
          expect(APP.domain.document.DocumentModel.create.callCount).to.equal(1);
          done();
        })
        .catch(done);
    });

    it('create a new invalid document', done => {
      APP.domain.document.DocumentModel.create = simpleMock.stub().resolveWith();

      const anotherDocument = clone(DOCUMENT);
      delete anotherDocument.name;

      documentService.create(anotherDocument, USER)
        .then(() => done('user should be invalid!'))
        .catch(error => {
          expect(APP.domain.document.DocumentModel.create.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');
          done();
        });
    });
  });

  describe('# destroy', () => {
    it('destroy a document', done => {
      APP.domain.document.DocumentModel.destroy = simpleMock.stub().resolveWith();

      documentService.destroy(DOCUMENT.id)
        .then(() => {
          expect(APP.domain.document.DocumentModel.destroy.callCount).to.equal(1);
          const quering = APP.domain.document.DocumentModel.destroy.lastCall.arg;
          expect(quering.where.id).to.equal(DOCUMENT.id);
          done();
        })
        .catch(done);
    });
  });

  describe('# find', () => {
    it('search a document by name', done => {
      APP.domain.document.DocumentModel.findAll = simpleMock.stub().resolveWith();
      const filter = {
        name: 'another document'
      };

      documentService.find(filter)
        .then(() => {
          expect(APP.domain.document.DocumentModel.findAll.callCount).to.equal(1);
          const quering = APP.domain.document.DocumentModel.findAll.lastCall.arg;
          expect(quering.where.name).to.deep.equal({
            like: '%another document%'
          });
          done();
        })
        .catch(done);
    });
  });

  describe('# findById', () => {
    it('find a document by ID', done => {
      APP.domain.document.DocumentModel.findById = simpleMock.stub().resolveWith();

      documentService.findById(DOCUMENT.id)
        .then(() => {
          expect(APP.domain.document.DocumentModel.findById.callCount).to.equal(1);
          expect(APP.domain.document.DocumentModel.findById.lastCall.arg).to.equal(DOCUMENT.id);
          done();
        })
        .catch(done);
    });
  });

  describe('# update', () => {
    it('update a valid document', done => {
      APP.domain.document.DocumentModel.update = simpleMock.stub().resolveWith(DOCUMENT);

      documentService.update(DOCUMENT.id, DOCUMENT, USER)
        .then(result => {
          expect(APP.domain.document.DocumentModel.update.callCount).to.equal(1);
          done();
        })
        .catch(done);
    });

    it('update a invalid document', done => {
      APP.domain.document.DocumentModel.update = simpleMock.stub().resolveWith(DOCUMENT);

      const anotherDocument = clone(DOCUMENT);
      delete anotherDocument.name;

      documentService.update(anotherDocument.id, anotherDocument, USER)
        .then(() => done('document should be invalid!'))
        .catch(error => {
          expect(APP.domain.document.DocumentModel.update.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');
          done();
        });
    });
  });
});
