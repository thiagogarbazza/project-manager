'use strict';
const chai = require('chai');
const clone = require('lodash').clone;
const DocumentServer = require('../../../api/domain/document/document-service');
const expect = chai.expect;
const simple = require('simple-mock');

let APP, DOCUMENT;

describe('domain document service', () => {
  let documentServer;

  beforeEach(() => {
    APP = {
      domain: {
        document: {
          Documents: {}
        }
      }
    };

    DOCUMENT = {
      code: 'COD-001',
      id: '1',
      name: 'Project manajer test'
    };

    documentServer = DocumentServer(APP);
  });

  it('should be defined', () => {
    expect(documentServer).to.not.be.undefined;
  });

  describe('# create', () => {
    beforeEach(() => {
      delete DOCUMENT.id;
      APP.domain.document.Documents.findOne = simple.stub().resolveWith(DOCUMENT);
    });

    it('Tentando salvar um documento válido', done => {
      APP.domain.document.Documents.create = simple.stub().resolveWith(DOCUMENT);

      documentServer
        .create(DOCUMENT)
        .then(() => {
          expect(APP.domain.document.Documents.create.callCount).to.equal(1);
          done();
        })
        .catch(error => {
          done(error);
        });
    });

    it('Tentando salvar um documento inválido', done => {
      APP.domain.document.Documents.create = simple.stub().resolveWith(DOCUMENT);
      const outroDocumento = clone(DOCUMENT);
      delete outroDocumento.code;

      documentServer
        .create(outroDocumento)
        .then(() => done('O Doucmento deveria estar inválido!'))
        .catch(error => {
          expect(APP.domain.document.Documents.create.callCount).to.equal(0);
          expect(APP.domain.document.Documents.findOne.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');
          done();
        });
    });
  });
});
