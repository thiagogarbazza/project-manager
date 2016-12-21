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
  BIG_TEXT: 'dASDFASDFASDFASDFasdfASDFASDFajksdhfjhasdfASDFasdnbfjasdufasDFASDfjkasuidhfuiashrbfasdfASDFAsdkfjhasjdhfjkasdFASDFasdjkfjashdjfaSDFASDFdASDFASDFASDFASDFasdfASDFASDFajksdhfjhasdfASDFasdnbfjasdufasDFASDfjkasuidhfuiashrbfasdfASDFAsdkfjhasjdhfjkasdFASDFasdjkfjashdjfaSDFASDFdASDFASDFASDFASDFasdfASDFASDFajksdhfjhasdfASDFasdnbfjasdufasDFASDfjkasuidhfuiashrbfasdfASDFAsdkfjhasjdhfjkasdFASDFasdjkfjashdjfaSDFASDFdASDFASDFASDFASDFasdfASDFASDFajksdhfjhasdfASDFasdnbfjasdufasDFASDfjkasuidhfuiashrbfasdfASDFAsdkfjhasjdhfjkasdFASDFasdjkfjashdjfaSDFASDFdASDFASDFASDFASDFasdfASDFASDFajksdhfjhasdfASDFasdnbfjasdufasDFASDfjkasuidhfuiashrbfasdfASDFAsdkfjhasjdhfjkasdFASDFasdjkfjashdjfaSDFASDF',
  INVALID_COLOR: 'invalid-color'
};
