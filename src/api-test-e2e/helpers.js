'use strict';
const app = require('../api/start');
const supertest = require('supertest');

global.app = app;
global.request = supertest(app);

// before(() => console.log('###### Passei aqui ANTES do arquivo .....'));
// after(() => console.log('###### Passei aqui DEPOIs do arquivo .....'));


// beforeEach(() => console.log('###### Passei aqui ANTES do test .....'));
// afterEach(() => console.log('###### Passei aqui DEPOIs do test .....'));
