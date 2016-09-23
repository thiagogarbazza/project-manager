'use strict';
const app = require('../api/start');
const supertest = require('supertest');
const expect = require('chai').expect;
const HttpStatus = require('http-status-codes');

global.app = app;
global.expect = expect;
global.HttpStatus = HttpStatus;
global.request = supertest(app);
