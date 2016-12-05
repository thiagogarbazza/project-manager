'use strict';
const Severity = require('../../../api/domain/work-item/severity');

describe('api domain work item severity', () => {

  it('should be defined', () => {
    expect(Severity).to.not.be.undefined;
  });


  describe('BLOCKER', () => {
    const {BLOCKER} = Severity;

    it('should be defined', () => {
      expect(BLOCKER).to.not.be.undefined;
    });

    it('key should be 3', () => {
      expect(BLOCKER.key).to.equal(1);
    });
  });

  describe('CRITICAL', () => {
    const {CRITICAL} = Severity;

    it('should be defined', () => {
      expect(CRITICAL).to.not.be.undefined;
    });

    it('key should be 1', () => {
      expect(CRITICAL.key).to.equal(2);
    });
  });

  describe('MAJOR', () => {
    const {MAJOR} = Severity;

    it('should be defined', () => {
      expect(MAJOR).to.not.be.undefined;
    });

    it('key should be 2', () => {
      expect(MAJOR.key).to.equal(3);
    });
  });

  describe('MINOR', () => {
    const {MINOR} = Severity;

    it('should be defined', () => {
      expect(MINOR).to.not.be.undefined;
    });

    it('key should be 4', () => {
      expect(MINOR.key).to.equal(4);
    });
  });


  describe('TRIVIAL', () => {
    const {TRIVIAL} = Severity;

    it('should be defined', () => {
      expect(TRIVIAL).to.not.be.undefined;
    });

    it('key should be 5', () => {
      expect(TRIVIAL.key).to.equal(5);
    });
  });

  describe('valueOfKey', () => {
    const {CRITICAL} = Severity;

    it('should be defined', () => {
      expect(Severity.valueOfKey(CRITICAL.key)).to.equal(CRITICAL);
    });
  });
});
