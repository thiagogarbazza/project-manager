'use strict';
const chai = require('chai');
const clone = require('lodash').clone;
const DocumentValidate = require('../../../api/domain/document/document-validate');
const expect = chai.expect;
const simple = require('simple-mock');

let APP, DOCUMENT;

describe('domain document validate', () => {
  let documentValidate;

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

    documentValidate = new DocumentValidate(APP);
  });

  it('should be defined', () => {
    expect(documentValidate).to.not.be.undefined;
  });

  describe('# onCreate', () => {
    it('o código é obrigatorio e foi informado', done => {
      APP.domain.document.Documents.findOne = simple.stub().resolveWith(DOCUMENT);

      documentValidate
        .onCreate(DOCUMENT)
        .then(() => {
          expect(APP.domain.document.Documents.findOne.callCount).to.equal(1);
          done();
        })
        .catch(error => {
          done(error);
        });
    });

    it('o código é obrigatorio e não foi informado', done => {
      delete DOCUMENT.code;

      documentValidate
        .onCreate(DOCUMENT)
        .then(() => done('The code is required.'))
        .catch(error => {
          expect(error.errors.length).to.equal(1);
          const fieldError = error.errors[0];
          expect(fieldError.code).to.equal('document.code.required');
          expect(fieldError.message).to.equal('The code is require.');
          done();
        });
    });

    it('o código deve ser único.', done => {
      const outroDocumento = clone(DOCUMENT);
      outroDocumento.id = '2';
      APP.domain.document.Documents.findOne = simple.stub().resolveWith(DOCUMENT);

      documentValidate
        .onCreate(outroDocumento)
        .then(() => done('o Còdigo deve ser unico'))
        .catch(error => {
          expect(APP.domain.document.Documents.findOne.callCount).to.equal(1);
          expect(error.errors.length).to.equal(1);
          const fieldError = error.errors[0];
          expect(fieldError.code).to.equal('document.code.unique');
          expect(fieldError.message).to.equal('The code should be unique');
          done();
        });
    });

    it('o código deve ser único', done => {
      const outroDocumento = clone(DOCUMENT);
      outroDocumento.codigo = 'COD-002';
      APP.domain.document.Documents.findOne = simple.stub().resolveWith(DOCUMENT);

      documentValidate
        .onCreate(outroDocumento)
        .then(() => {
          expect(APP.domain.document.Documents.findOne.callCount).to.equal(1);
          done();
        })
        .catch(error => {
          done(error);
        });
    });

    it('o código deve ser único se possuir id igual', done => {
      APP.domain.document.Documents.findOne = simple.stub().resolveWith(DOCUMENT);

      documentValidate
        .onCreate(DOCUMENT)
        .then(() => {
          expect(APP.domain.document.Documents.findOne.callCount).to.equal(1);
          done();
        })
        .catch(error => {
          done(error);
        });
    });
  });
});
