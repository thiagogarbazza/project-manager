'use strict';

const {clone} = require('lodash');
const {expect} = require('chai');
const dottie = require('dottie');
const mockery = require('mockery');
const simpleMock = require('simple-mock');

mockery.enable();
mockery.warnOnUnregistered(false);
mockery.warnOnReplace(false);

global.clone = clone;
global.dottie = dottie;
global.expect = expect;
global.mockery = mockery;
global.simpleMock = simpleMock;

global.properties = {
  BIG_TEXT: `
  Lorem ipsum dolor sit amet, aperiri persecuti te vim, mei dicta eripuit cu. Id ius debet repudiandae interpretaris.
  Noluisse scripserit te cum. Te euismod habemus pri.

  Eu est bonorum maiestatis, an vix amet lorem rationibus.
  Nam at conceptam repudiandae definitionem, sea an porro singulis incorrupte.
  Sit case modus conceptam cu, cu audire expetendis complectitur pro, dicta option consequat eos ei.
  Sed ad fastidii tractatos, nam eu tempor perfecto quaestio. Pri ponderum praesent intellegat an, vim ea exerci verear nusquam.

  Sint liber dictas at vix, ei his postulant democritum, porro eripuit mei in.
  Has ut facilisi vituperata ullamcorper, vim brute velit vivendo ei. Has in habeo nullam, sed torquatos philosophia et.
  Sit et labores corrumpit signiferumque, id invidunt sensibus sit.

  Saepe vivendum has te, dicta nusquam has te.
  Id causae timeam eos. Minim integre no duo, soleat dissentiet mei no. Laoreet inermis delicatissimi ne sea, vix id labore referrentur.
  Nisl prima mucius at vim, cum cu virtute aliquid tractatos.

  Ex aeque aliquando cotidieque vix, inimicus percipitur definitiones pri ei, ea eos aeque reprimique scribentur.
  Per ut tota lorem interesset, ius iriure indoctum eu.
  Cum eirmod accusam adolescens an, no verterem salutandi eum, nam ne tota etiam. Salutatus consectetuer eos ex, qui ea eirmod maiorum intellegam.
  `,
  INVALID_COLOR: 'invalid-color'
};
