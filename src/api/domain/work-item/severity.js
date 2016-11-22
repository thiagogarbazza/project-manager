'use strict';

class Severity {
  constructor(code, name) {
    this.code = code;
    this.name = name;
  }
}

const CRITICAL = new Severity(1, 'Critical');
const MAJOR = new Severity(2, 'Major');
const MEDIUM = new Severity(3, 'Medium');
const MINOR = new Severity(4, 'Minor');
const COSMETIC = new Severity(5, 'Cosmetic');

const SEVERITIES = [COSMETIC, CRITICAL, MAJOR, MEDIUM, MINOR];

function valueOf(code) {
  return SEVERITIES.find(severity => severity.code === code);
}

module.exports = {
  COSMETIC,
  CRITICAL,
  MAJOR,
  MEDIUM,
  MINOR,
  valueOf
};
