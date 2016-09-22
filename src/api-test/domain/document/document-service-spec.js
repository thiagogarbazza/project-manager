'use strict';
const chai = require('chai');
const clone = require('lodash').clone;
const DocumentService = require('../../../api/domain/document/document-service');
const expect = chai.expect;
const simple = require('simple-mock');

let APP, DOCUMENT;

describe('domain document service', () => {
  let documentService;

  beforeEach(() => {
    APP = {
      domain: {
        document: {
          DocumentModel: {}
        }
      }
    };

    DOCUMENT = {
      code: 'COD-001',
      id: '1',
      name: 'Project manajer test'
    };

    documentService = DocumentService(APP);
  });

  it('should be defined', () => {
    expect(documentService).to.not.be.undefined;
  });

  describe('# create', () => {
    beforeEach(() => {
      delete DOCUMENT.id;
      APP.domain.document.DocumentModel.findOne = simple.stub().resolveWith(DOCUMENT);
    });

    it('Tentando salvar um documento válido', done => {
      APP.domain.document.DocumentModel.create = simple.stub().resolveWith(DOCUMENT);

      documentService
        .create(DOCUMENT)
        .then(() => {
          expect(APP.domain.document.DocumentModel.create.callCount).to.equal(1);
          done();
        })
        .catch(error => {
          done(error);
        });
    });

    it('Tentando salvar um documento inválido', done => {
      APP.domain.document.DocumentModel.create = simple.stub().resolveWith(DOCUMENT);
      const outroDocumento = clone(DOCUMENT);
      delete outroDocumento.code;

      documentService
        .create(outroDocumento)
        .then(() => done('O Doucmento deveria estar inválido!'))
        .catch(error => {
          expect(APP.domain.document.DocumentModel.create.callCount).to.equal(0);
          expect(APP.domain.document.DocumentModel.findOne.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');
          done();
        });
    });
  });
});
