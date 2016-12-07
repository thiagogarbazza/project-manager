'use strict';

const path = require('path');
const yaml = require('yamljs');

global.resultFile = resultFile;

function resultFile(dirName, file) {
  const realPathFile = path.join(dirName, file);
  return yaml.load(realPathFile);
}
