'use strict';
const Severity = require('../../../api/domain/work-item/severity');

describe('api domain work item severity', () => {

  it('should be defined', () => {
    expect(Severity).to.not.be.undefined;
  });

  describe('COSMETIC', () => {
    const {COSMETIC} = Severity;

    it('should be defined', () => {
      expect(COSMETIC).to.not.be.undefined;
    });

    it('code should be 5', () => {
      expect(COSMETIC.code).to.equal(5);
    });
  });

  describe('CRITICAL', () => {
    const {CRITICAL} = Severity;

    it('should be defined', () => {
      expect(CRITICAL).to.not.be.undefined;
    });

    it('code should be 1', () => {
      expect(CRITICAL.code).to.equal(1);
    });
  });

  describe('MAJOR', () => {
    const {MAJOR} = Severity;

    it('should be defined', () => {
      expect(MAJOR).to.not.be.undefined;
    });

    it('code should be 2', () => {
      expect(MAJOR.code).to.equal(2);
    });
  });

  describe('MEDIUM', () => {
    const {MEDIUM} = Severity;

    it('should be defined', () => {
      expect(MEDIUM).to.not.be.undefined;
    });

    it('code should be 3', () => {
      expect(MEDIUM.code).to.equal(3);
    });
  });

  describe('MINOR', () => {
    const {MINOR} = Severity;

    it('should be defined', () => {
      expect(MINOR).to.not.be.undefined;
    });

    it('code should be 4', () => {
      expect(MINOR.code).to.equal(4);
    });
  });

  describe('valueOf', () => {
    const {CRITICAL} = Severity;

    it('should be defined', () => {
      expect(Severity.valueOf(CRITICAL.code)).to.equal(CRITICAL);
    });
  });
});
