'use strict';

class Severity {
  constructor(key, name, description) {
    this.key = key;
    this.name = name;
    this.description = description;
  }
}

const BLOCKER = new Severity(1, 'Blocker', 'Blocks development and/or testing work, production could not run.');
const CRITICAL = new Severity(2, 'Critical', 'Crashes, loss of data, severe memory leak.');
const MAJOR = new Severity(3, 'Major', 'Major loss of function.');
const MINOR = new Severity(4, 'Minor', 'Minor loss of function, or other problem where easy workaround is present.');
const TRIVIAL = new Severity(5, 'Trivial', 'Cosmetic problem like misspelt words or misaligned text.');

const SEVERITIES = [BLOCKER, CRITICAL, MAJOR, MINOR, TRIVIAL];

function valueOfKey(key) {
  return SEVERITIES.find(severity => severity.key === key);
}

module.exports = {
  BLOCKER,
  CRITICAL,
  MAJOR,
  MINOR,
  TRIVIAL,
  valueOfKey
};
