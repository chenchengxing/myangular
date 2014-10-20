
'use strict';
var expect = require('chai').expect;
var setupModuleLoader = require('../src/loader');
var window = {};

beforeEach(function () {
  delete window.angular;
});

describe('setupModuleLoader', function() {
  it('exposes angular on the window', function() {
    setupModuleLoader(window);
    expect(window.angular).to.not.be.an('undefined');
  });
  it('creates angular just once', function() {
    setupModuleLoader(window);
    var ng = window.angular;
    setupModuleLoader(window);
    expect(window.angular).to.equal(ng);
  });
});