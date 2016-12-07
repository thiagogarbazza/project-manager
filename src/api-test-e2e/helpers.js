'use strict';

const app = require('../api/app');
const supertest = require('supertest');
const expect = require('chai').expect;
const HttpStatus = require('http-status-codes');

global.app = app;
global.expect = expect;
global.HttpStatus = HttpStatus;
global.request = supertest(app);

global.USER = {
  id: 'a3381700-d485-4648-8549-829c4b036005',
  name: 'Thiago Garbazza',
  token: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImEzMzgxNzAwLWQ0ODUtNDY0OC04NTQ5LTgyOWM0YjAzNjAwNSIsInRva2VuQ3JlYXRlQXQiOiIyMDE2LTA5LTIzVDIxOjQ4OjIwLjI3MloifQ.xozZTJxOgDr5tzaSsUeRQnytdrWNBEsitAx-S028S40'
};
