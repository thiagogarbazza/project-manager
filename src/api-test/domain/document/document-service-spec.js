'use strict';

const mockery = require('mockery');
const PATH_TO_DOCUMENT_SERVICE = '../../../api/domain/document/document-service';

const DOCUMENT = {
  content: '#  template user story',
  id: '7196d519-3eeb-48d0-b5dd-73f9240ec483',
  name: 'ESCR001 - template user story',
  projectId: '43cf39a6-f1a8-48fe-a76b-ee042cb2ea9a'
};

const DOCUMENT_VALIDATE = class {
  onCreate(document) {
    return document.name ? Promise.resolve() : Promise.reject({name: 'BusinessError'});
  }
  onUpdate(document) {
    return document.name ? Promise.resolve() : Promise.reject({name: 'BusinessError'});
  }
};

describe('api domain document service', () => {
  const APP = {};
  let USER;
  let DocumentService;
  let documentService;

  before(() => {
    mockery.registerAllowable(PATH_TO_DOCUMENT_SERVICE, true);
    mockery.registerMock('./document-validate', DOCUMENT_VALIDATE);
    mockery.enable({useCleanCache: true});

    DocumentService = require(PATH_TO_DOCUMENT_SERVICE);
  });

  after(() => {
    mockery.deregisterMock('./document-validate');
    mockery.deregisterAllowable(PATH_TO_DOCUMENT_SERVICE);
    mockery.disable();
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
        .then(() => {
          expect(APP.domain.document.DocumentModel.create.callCount).to.equal(1);

          return done();
        })
        .catch(done);
    });

    it('create a new invalid document', done => {
      const anotherDocument = clone(DOCUMENT);

      delete anotherDocument.name;
      APP.domain.document.DocumentModel.create = simpleMock.stub().resolveWith();

      documentService.create(anotherDocument, USER)
        .then(() => done('user should be invalid!'))
        .catch(error => {
          expect(APP.domain.document.DocumentModel.create.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');

          return done();
        });
    });
  });

  describe('# destroy', () => {
    it('destroy a document', done => {
      APP.domain.document.DocumentModel.destroy = simpleMock.stub().resolveWith();

      documentService.destroy(DOCUMENT.id)
        .then(() => {
          const quering = APP.domain.document.DocumentModel.destroy.lastCall.arg;

          expect(APP.domain.document.DocumentModel.destroy.callCount).to.equal(1);
          expect(quering.where.id).to.equal(DOCUMENT.id);

          return done();
        })
        .catch(done);
    });
  });

  describe('# find', () => {
    it('search a document by name', done => {
      const filter = {name: 'another document'};

      APP.domain.document.DocumentModel.findAll = simpleMock.stub().resolveWith();

      documentService.find(filter)
        .then(() => {
          const quering = APP.domain.document.DocumentModel.findAll.lastCall.arg;

          expect(APP.domain.document.DocumentModel.findAll.callCount).to.equal(1);
          expect(quering.where.name).to.deep.equal({like: '%another document%'});

          return done();
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

          return done();
        })
        .catch(done);
    });
  });

  describe('# update', () => {
    it('update a valid document', done => {
      APP.domain.document.DocumentModel.update = simpleMock.stub().resolveWith(DOCUMENT);

      documentService.update(DOCUMENT.id, DOCUMENT, USER)
        .then(() => {
          expect(APP.domain.document.DocumentModel.update.callCount).to.equal(1);

          return done();
        })
        .catch(done);
    });

    it('update a invalid document', done => {
      const anotherDocument = clone(DOCUMENT);

      delete anotherDocument.name;
      APP.domain.document.DocumentModel.update = simpleMock.stub().resolveWith(DOCUMENT);

      documentService.update(anotherDocument.id, anotherDocument, USER)
        .then(() => done('document should be invalid!'))
        .catch(error => {
          expect(APP.domain.document.DocumentModel.update.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');

          return done();
        });
    });
  });
});
